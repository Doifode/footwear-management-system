import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid 
                item 
                xl={12} 
                md={6} 
                sx={{ 
                    backgroundColor: isDarkMode ? '#333' : '#f0f0f0', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <Typography variant="h4" color={isDarkMode ? '#fff' : '#000'}>
                    Welcome to the App
                </Typography>
            </Grid>

            <Grid 
                item 
                xl={12} 
                md={6} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#222' : '#fff',
                }}
            >
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
