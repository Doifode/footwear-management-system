import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid2 as Grid, IconButton } from "@mui/material";
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from '../../../helper/Constants';
import FMSNavbar from "./FMSNavbar";
import { SideBarListItems } from './ListItems';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = useState(sessionStorage.getItem("currentPath") || "/")
    const handleNavigation = (path: string) => {
        navigate(path);
        setCurrentPath(path);
        sessionStorage.setItem("currentPath", path)
    };

    return (
        <>
            <Grid container>
                <Grid bgcolor={"#1976D2"} className={"d-none d-xl-block d-lg-block"} size={2}>
                    <Box height={"100vh"}  >
                        {routes.map((page) => (
                            <>
                                {
                                    page.children.map((i) => <SideBarListItems
                                        isActive={Boolean((currentPath == i.path))}
                                        label={i.label}
                                        navigate={() => handleNavigation(i.path)}
                                        key={i.path}
                                    />)
                                }
                            </>

                        ))}
                    </Box>
                </Grid>
                <Grid size={{ sm: 12, xl: 10, lg: 10, md: 10 }}>
                    <FMSNavbar />
                    <IconButton size="small" onClick={() => navigate(-1)} > <ArrowBackIcon /> Back</IconButton>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard