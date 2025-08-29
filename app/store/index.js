import { configureStore } from "@reduxjs/toolkit";
import questionsReducers from "./slice/inputSlice";
import outputReducers from "./slice/outputSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducers,
    outputs: outputReducers,
  },
});
