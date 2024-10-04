import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmationPopupProps {
  open: boolean;
  title: string;
  subMessage: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const FMSConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  open,
  title,
  subMessage,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>{subMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FMSConfirmationPopup;
