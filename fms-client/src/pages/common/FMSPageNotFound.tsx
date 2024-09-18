import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 
const FMSPageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/auth/login")
   };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" mt={2} mb={4}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoToLogin}>
        Go to Login Page
      </Button>
    </Box>
  );
};

export default FMSPageNotFound;
