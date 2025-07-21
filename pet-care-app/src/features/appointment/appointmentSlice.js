import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

// 👉 Add Appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async ({ appointmentData, uid }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const appointmentId = Date.now().toString();
      const newAppointment = { ...appointmentData, applyId: appointmentId };

      const userDocSnap = await getDoc(userRef);
      const existingAppointments = userDocSnap.exists()
        ? userDocSnap.data().appointments || []
        : [];

      const updatedAppointments = [...existingAppointments, newAppointment];

      await updateDoc(userRef, { appointments: updatedAppointments });

      return newAppointment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 👉 Fetch Appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data().appointments || [];
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 👉 Delete Appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async ({ uid, applyId }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userRef);
      if (!userDocSnap.exists()) throw new Error('User not found');

      const existingAppointments = userDocSnap.data().appointments || [];
      const updatedAppointments = existingAppointments.filter(
        (appointment) => appointment.applyId !== applyId
      );

      await updateDoc(userRef, { appointments: updatedAppointments });

      return applyId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 👉 Update Appointment
export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ uid, applyId, updatedData }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userRef);

      if (!userDocSnap.exists()) throw new Error('User not found');

      const existingAppointments = userDocSnap.data().appointments || [];
      const updatedAppointments = existingAppointments.map((appointment) =>
        appointment.applyId === applyId
          ? { ...appointment, ...updatedData }
          : appointment
      );

      await updateDoc(userRef, { appointments: updatedAppointments });

      return { applyId, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 👉 Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment.applyId !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const { applyId, updatedData } = action.payload;
        const index = state.appointments.findIndex(
          (a) => a.applyId === applyId
        );
        if (index !== -1) {
          state.appointments[index] = {
            ...state.appointments[index],
            ...updatedData,
          };
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const appointmentReducer = appointmentSlice.reducer;
