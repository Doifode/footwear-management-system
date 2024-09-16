import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Grid2 as Grid, Button, Collapse } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import FMSNavbar from "../common/FMSNavbar";
import { routerLinks } from '../../helper/Constants';
import { useState } from 'react';
const Dashboard = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const handleNavigation = (path: string) => {
        navigate(path);
    }
    return (
        <>
            <Grid container>
                <Grid className={"d-none d-xl-block d-lg-block"} size={2}>
                    <Box border={2} height={"100vh"} >
                        <Button onClick={() => setIsOpen(!isOpen)}>Menu</Button>
                        {routerLinks.map((page) => (
                            <Grid size={12} >
                                <Collapse in={isOpen}>
                                    <Button
                                        onClick={() => handleNavigation(page.path)}
                                        key={page.path}
                                    >
                                        {page.label}
                                    </Button>
                                </Collapse>
                            </Grid>
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