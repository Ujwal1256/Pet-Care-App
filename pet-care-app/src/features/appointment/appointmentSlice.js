import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

// Add Appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async ({ appointmentData, uid }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const appointmentId = Date.now().toString(); 
      console.log("appontdata",appointmentData)
      const newAppointment = { ...appointmentData, applyId:appointmentId };

      console.log("newAppointment",newAppointment)
      const userDocSnap = await getDoc(userRef);
      const existingAppointments = userDocSnap.exists()
        ? userDocSnap.data().appointments || []
        : [];

      const updatedAppointments = [...existingAppointments, newAppointment];

      await updateDoc(userRef, {
        appointments: updatedAppointments,
      });

      return newAppointment;
    } catch (error) {
      console.error('Add Appointment Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return data.appointments || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Fetch Appointments Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
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
      });
  },
});

export const appointmentReducer = appointmentSlice.reducer;
