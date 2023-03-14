import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user-slice";
import errorSlice from "./reducers/error-slice";

const store = configureStore({
    reducer: {user: userSlice.reducer, error: errorSlice.reducer}
});

export default store;
