import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    storeUserData: (state, {payload}) => {
      state.value = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeUserData } = userDataSlice.actions

export default userDataSlice.reducer