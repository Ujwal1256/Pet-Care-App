import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Add Reminder
export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async ({ reminderData, uid }, { rejectWithValue }) => {
    try {
      const reminderId = Date.now().toString();

      const newReminder = { ...reminderData, reminderId };
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);
      const existingReminders = userDocSnap.exists()
        ? userDocSnap.data().reminders || []
        : [];

      const updatedReminders = [...existingReminders, newReminder];

      await updateDoc(userRef, { reminders: updatedReminders });

      return newReminder;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Reminders
export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data().reminders || [];
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Reminder
export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async ({ uid, reminderId }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (!userDocSnap.exists()) return [];

      const existingReminders = userDocSnap.data().reminders || [];
      const updatedReminders = existingReminders.filter(
        (r) => r.reminderId !== reminderId
      );

      await updateDoc(userRef, { reminders: updatedReminders });

      return reminderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Reminder
export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async ({ uid, updatedReminder }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userRef);

      if (!userDocSnap.exists()) return [];

      const existingReminders = userDocSnap.data().reminders || [];
      const updatedReminders = existingReminders.map((reminder) =>
        reminder.reminderId === updatedReminder.reminderId
          ? updatedReminder
          : reminder
      );

      await updateDoc(userRef, { reminders: updatedReminders });

      return updatedReminder;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
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
