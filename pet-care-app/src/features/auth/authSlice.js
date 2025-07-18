import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,signOut 
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Fetch user data from Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const serialized = { uid, ...userData };
        return serialized;
      } else {
        return rejectWithValue("User document doesn't exist.");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCred.user.uid;

      const userData = {
        email,
        createdAt: new Date().toISOString(),
      };

      // Save to Firestore
      await setDoc(doc(db, "users", uid), userData);

      // Return serialized user data
      // return { uid, ...userData };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        // LOGOUT
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      localStorage.removeItem("user");
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
