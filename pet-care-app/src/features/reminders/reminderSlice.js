import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// ADD Reminder
export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async ({ reminderData, uid }, { rejectWithValue }) => {
    try {
      const reminderId = Date.now().toString();
      const newReminder = { ...reminderData, reminderId };
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const existing = userSnap.exists() ? userSnap.data().reminders || [] : [];
      const updated = [...existing, newReminder];
      await updateDoc(userRef, { reminders: updated });
      return newReminder;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// FETCH Reminders
export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      return snap.exists() ? snap.data().reminders || [] : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE Reminder
export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async ({ uid, reminderId }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) return [];
      const reminders = snap.data().reminders || [];
      const updated = reminders.filter((r) => r.reminderId !== reminderId);
      await updateDoc(userRef, { reminders: updated });
      return reminderId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE Reminder
export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async ({ uid, updatedReminder }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) return [];
      const reminders = snap.data().reminders || [];
      const updated = reminders.map((r) =>
        r.reminderId === updatedReminder.reminderId ? updatedReminder : r
      );
      await updateDoc(userRef, { reminders: updated });
      return updatedReminder;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// SLICE
const reminderSlice = createSlice({
  name: "reminders",
  initialState: {
    reminders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders.push(action.payload);
      })
      .addCase(addReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = action.payload;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = state.reminders.filter(
          (r) => r.reminderId !== action.payload
        );
      })
      .addCase(deleteReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = state.reminders.map((r) =>
          r.reminderId === action.payload.reminderId ? action.payload : r
        );
      })
      .addCase(updateReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const reminderReducer = reminderSlice.reducer;
