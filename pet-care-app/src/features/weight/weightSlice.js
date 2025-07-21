import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Add Weight under specific petId
export const addWeight = createAsyncThunk(
  "weights/addWeight",
  async ({ uid, petId, weight, date }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const weightId = Date.now().toString();
      const newEntry = { weight, date, weightId };

      const userSnap = await getDoc(userRef);
      const weightsData = userSnap.exists() && userSnap.data().weights
        ? userSnap.data().weights
        : {};

      const petWeights = weightsData[petId] || [];
      const updatedWeights = {
        ...weightsData,
        [petId]: [...petWeights, newEntry],
      };

      await updateDoc(userRef, { weights: updatedWeights });

      return { petId, weight: newEntry };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch All Weights
export const fetchWeights = createAsyncThunk(
  "weights/fetchWeights",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const weights = userSnap.exists() ? userSnap.data().weights || {} : {};
      return weights;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weightSlice = createSlice({
  name: "weights",
  initialState: {
    weights: {}, // { petId: [ { weight, date, weightId } ] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWeight.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWeight.fulfilled, (state, action) => {
        state.loading = false;
        const { petId, weight } = action.payload;
        if (!state.weights[petId]) {
          state.weights[petId] = [];
        }
        state.weights[petId].push(weight);
      })
      .addCase(addWeight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWeights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeights.fulfilled, (state, action) => {
        state.loading = false;
        state.weights = action.payload;
      })
      .addCase(fetchWeights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const weightReducer = weightSlice.reducer;
