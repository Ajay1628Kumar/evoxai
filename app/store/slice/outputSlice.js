import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outputs: [],
  loading:false
};

const outputSlice = createSlice({
  name: "outputs",
  initialState,
  reducers: {
    addOutput: (state, action) => {
      state.outputs.push(action.payload);
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    }
  },
});

export const { addOutput,setLoading } = outputSlice.actions;
export default outputSlice.reducer;
