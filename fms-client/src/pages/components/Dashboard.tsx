import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Grid2 as Grid, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import FMSNavbar from "../common/FMSNavbar";
import { routerLinks } from '../../helper/Constants';
const Dashboard = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    }
    return (
        <>
            <Grid container>
                <Grid className={"d-none d-xl-block d-lg-block"} size={2}>
                    <Box border={2} height={"100vh"}>

                        {routerLinks.map((page) => (
                            <Grid size={12}>
                                <Button
                                    onClick={() => handleNavigation(page.path)}
                                    key={page.path}
                                >
                                    {page.label}
                                </Button>
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