import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: {},
  genre: {}
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getApiConfiguration(state, action) {
      state.url = action.payload
    },
    getGenres(state, action) {
      state.genre = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer