import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    initialState: {
        userDetails: {}
    },
    name: "AuthSlice",
    reducers: {
        setUserDetailsAction: (state, actions) => {
            state.userDetails = actions.payload
        }
    }
});

export const { setUserDetailsAction } = AuthSlice.actions;
export default AuthSlice.reducer;
