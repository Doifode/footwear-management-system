// src/components/LoadingButton.js
import { Button, CircularProgress } from '@mui/material';

const FMSLoadingButton = ({
    isLoading = false,    // Whether the button is in loading state
    label = 'Submit',     // The text to display on the button
    disabled = false,     // Whether the button is disabled
    ...props              // Spread other props like onClick, type, etc.
}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            disabled={isLoading || disabled}
            {...props}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
            {label}
        </Button>
    );
};

export default FMSLoadingButton;
