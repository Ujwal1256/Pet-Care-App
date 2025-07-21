import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Add Pet
export const addPet = createAsyncThunk(
  "pets/addPet",
  async ({ petData, uid }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const petId = Date.now().toString();
      const newPet = { ...petData, petId };

      const userDocSnap = await getDoc(userRef);
      const existingPets = userDocSnap.exists()
        ? userDocSnap.data().mypets || []
        : [];

      const updatedPets = [...existingPets, newPet];

      await updateDoc(userRef, {
        mypets: updatedPets,
      });

      return newPet;
    } catch (error) {
      console.error("Add Pet Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Pets
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return data.mypets || [];
      } else {
        console.log("userData not exist");
        return [];
      }
    } catch (error) {
      console.error("Fetch Pets Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async ({ updatedPet, uid }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const pets = userSnap.data().mypets || [];

      const updatedPets = pets.map((pet) =>
        pet.petId === updatedPet.petId ? updatedPet : pet
      );

      await updateDoc(userRef, { mypets: updatedPets });
      return updatedPet;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Pet
export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async ({ petId, uid }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const pets = userSnap.data().mypets || [];

      const updatedPets = pets.filter((pet) => pet.petId !== petId);
      await updateDoc(userRef, { mypets: updatedPets });

      return petId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload || [];
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.map((pet) =>
          pet.petId === action.payload.petId ? action.payload : pet
        );
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter((pet) => pet.petId !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const petReducer = petSlice.reducer;
