import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    initialState: {
        userDetails: { roleId: 0 }
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
