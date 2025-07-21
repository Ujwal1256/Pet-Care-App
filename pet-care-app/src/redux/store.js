import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { petReducer } from '../features/myPets/petSlice'
import { appointmentReducer } from '../features/appointment/appointmentSlice'
import {reminderReducer} from '../features/reminders/reminderSlice'
import { medicationReducer } from '../features/medication/medicationSlice'
import { weightReducer } from '../features/weight/weightSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets : petReducer,
    appointments:appointmentReducer,
    reminders: reminderReducer,
    medication:medicationReducer,
    weight : weightReducer
  },
})

