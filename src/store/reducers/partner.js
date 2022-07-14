import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: {}
}

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartner: (state, action) => {
      state.info = action.payload
    }
  },
  extraReducers: {}
})

export const { setPartner } = partnerSlice.actions

export default partnerSlice.reducer