import { configureStore } from "@reduxjs/toolkit";
import habitSlice from "../slices/habitSlice";

const store = configureStore({
  reducer: {
    habits: habitSlice,
  },
});

export default store;
