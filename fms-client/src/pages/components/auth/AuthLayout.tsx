import { Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid size={{ xl: 12, md: 6 }} sx={{ backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4">Welcome to the App</Typography>
            </Grid>

            <Grid size={{ xl: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
