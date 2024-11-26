import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { _Availability } from '../../services/availability'

const initialState = {
  settingsAvailability: [] as _Availability,
}

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: initialState,
  reducers: {
    setSettingsAvailability: (state, action) => {
      state.settingsAvailability = action.payload
    },
  },
})

export const { setSettingsAvailability } = availabilitySlice.actions

export default availabilitySlice.reducer

export const getSettingsAvailability = (state: RootState) => state.availability.settingsAvailability
