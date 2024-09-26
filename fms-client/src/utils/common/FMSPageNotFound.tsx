import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface pageNotFoundProps {
  statusCode: number,
  title: string,
  subTitle: string,
  buttonLabel: string,
  navigatePath?: string
}
const FMSPageNotFound: React.FC<pageNotFoundProps> = ({
  statusCode,
  title,
  subTitle,
  buttonLabel,
  navigatePath }) => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    if (navigatePath) {
      navigate(navigatePath)
    } else {
      navigate(-1)
    }
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
        {statusCode}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body1" mt={2} mb={4}>
        {subTitle}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoToLogin}>
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default FMSPageNotFound;
