import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Grid2 as Grid, IconButton } from "@mui/material";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from '../../../helper/Constants';
import { IRootState } from '../../../helper/types/CommonTypes';
import { setThemeMode } from '../../../redux/slice/Theme';
import FMSNavbar from "./FMSNavbar";
import { SideBarListItems } from './ListItems';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = useState(sessionStorage.getItem("currentPath") || "/");
    const { roleId } = useSelector((state: IRootState) => state.Auth.userDetails);
    const state = useSelector((state: IRootState) => state.Theme.mode);
    const dispatch = useDispatch();

    const handleNavigation = (path: string) => {
        navigate(path);
        setCurrentPath(path);
        sessionStorage.setItem("currentPath", path)
    };

    return (
        <>
            <Grid container>
                <Grid bgcolor={state == "dark" ? "" : "#1976D2"} className={"d-none d-xl-block d-lg-block"} size={2}>
                    <Box height={"100vh"} display="flex" flexDirection={"column"} justifyContent={"space-between"} >
                        <Box>
                            {routes.map((page) => (
                                <React.Fragment key={page.title}>
                                    {
                                        page.children.map((i) => <SideBarListItems
                                            isHidden={!i.roleAccessArray.includes(roleId)}
                                            isActive={Boolean((currentPath == i.path))}
                                            label={i.label}
                                            navigate={() => handleNavigation(i.path)}
                                            key={i.path}
                                        />)
                                    }
                                </React.Fragment>

                            ))}
                        </Box>
                        <IconButton size="small" onClick={() => dispatch(setThemeMode((state === "dark") ? "light" : "dark"))} >
                            {state == "light" ?
                                <DarkModeIcon >
                                </DarkModeIcon>
                                :
                                <LightModeIcon  >
                                </LightModeIcon>
                            }
                        </IconButton>
                    </Box>
                </Grid>
                <Grid size={{ sm: 12, xl: 10, lg: 10, md: 10 }}>
                    <FMSNavbar />
                    <IconButton size="small" onClick={() => navigate(-1)} > <ArrowBackIcon /> Back</IconButton>
                    <Outlet />
                </Grid>
            </Grid >
        </>
    )
}

export default Dashboard