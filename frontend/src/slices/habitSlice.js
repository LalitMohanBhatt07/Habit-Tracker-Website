import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: JSON.parse(localStorage.getItem("habits")) || []
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
  },
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
