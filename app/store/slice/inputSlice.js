import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const inputSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestions: (state, action) => {
      state.questions.push(action.payload);
    },
  },
});

export const { addQuestions } = inputSlice.actions;
export default inputSlice.reducer;
