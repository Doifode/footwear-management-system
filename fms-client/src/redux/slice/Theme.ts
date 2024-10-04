import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
    initialState: {
        mode: "dark"
    },
    name: "ThemeSlice",
    reducers: {
        setThemeMode: (state, actions) => {
            state.mode = actions.payload
        }
    }
});

export const { setThemeMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
