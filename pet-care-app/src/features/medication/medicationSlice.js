import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Add Medication
export const addMedication = createAsyncThunk(
  "medications/addMedication",
  async ({ medicationData, uid }, { rejectWithValue }) => {
    try {
      const medicationId = Date.now().toString();
      const newMedication = { ...medicationData, medicationId };

      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);
      const existingMedications = userDocSnap.exists()
        ? userDocSnap.data().medications || []
        : [];

      const updatedMedications = [...existingMedications, newMedication];
      await updateDoc(userRef, { medications: updatedMedications });

      return newMedication;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Medications
export const fetchMedications = createAsyncThunk(
  "medications/fetchMedications",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data().medications || [];
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Medication
export const deleteMedication = createAsyncThunk(
  "medications/deleteMedication",
  async ({ uid, medicationId }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (!userDocSnap.exists()) return [];

      const existingMedications = userDocSnap.data().medications || [];
      const updatedMedications = existingMedications.filter(
        (m) => m.medicationId !== medicationId
      );

      await updateDoc(userRef, { medications: updatedMedications });

      return medicationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Medication
export const updateMedication = createAsyncThunk(
  "medications/updateMedication",
  async ({ uid, updatedMedication }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (!userDocSnap.exists()) return [];

      const existingMedications = userDocSnap.data().medications || [];
      const updatedMedications = existingMedications.map((med) =>
        med.medicationId === updatedMedication.medicationId
          ? updatedMedication
          : med
      );

      await updateDoc(userRef, { medications: updatedMedications });

      return updatedMedication;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const medicationSlice = createSlice({
  name: "medications",
  initialState: {
    medications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMedication.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications.push(action.payload);
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMedications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = action.payload;
      })
      .addCase(fetchMedications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMedication.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = state.medications.filter(
          (m) => m.medicationId !== action.payload
        );
      })
      .addCase(deleteMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMedication.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = state.medications.map((m) =>
          m.medicationId === action.payload.medicationId ? action.payload : m
        );
      })
      .addCase(updateMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const medicationReducer = medicationSlice.reducer;
