import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { petReducer } from '../features/myPets/petSlice'
import { appointmentReducer } from '../features/appointment/appointmentSlice'
import {reminderReducer} from '../features/reminders/reminderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets : petReducer,
    appointments:appointmentReducer,
    reminders: reminderReducer
  },
})

