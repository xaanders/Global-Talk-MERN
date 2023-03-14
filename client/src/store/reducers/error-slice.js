import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
       getErrors(state, actions) {
        return actions.payload;
       }
    }

});

export const errorActions = errorSlice.actions;

export default errorSlice;