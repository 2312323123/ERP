import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { _Availability } from '../../services/availability'

const initialState = {
  settingsAvailability: [] as _Availability,
  selectedUsers: [] as string[],
}

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: initialState,
  reducers: {
    setSettingsAvailability: (state, action) => {
      state.settingsAvailability = action.payload
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload
    },
  },
})

export const { setSettingsAvailability, setSelectedUsers } = availabilitySlice.actions

export default availabilitySlice.reducer

export const getSettingsAvailability = (state: RootState) => state.availability.settingsAvailability
export const getSelectedUsers = (state: RootState) => state.availability.selectedUsers
