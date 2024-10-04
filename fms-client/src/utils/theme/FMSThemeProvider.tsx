import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../helper/types/CommonTypes';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const FMSThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const state = useSelector((state: IRootState) => state.Theme.mode);

    const darkTheme = createTheme({
        palette: {
            mode: state,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
