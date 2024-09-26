import React, { useState } from 'react';
import { Fab, Box, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const FabActions: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleButtons = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {/* Main FAB Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleButtons}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          transition: 'transform 0.3s ease-in-out',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>

      {/* Secondary Buttons */}
      <Zoom in={open}>
        <Fab
          color="secondary"
          aria-label="edit"
          onClick={() => alert('Edit clicked')}
          sx={{
            position: 'absolute',
            bottom: 86,
            right: 16,
          }}
        >
          <EditIcon />
        </Fab>
      </Zoom>

      <Zoom in={open}>
        <Fab
          color="default"
          aria-label="delete"
          onClick={() => alert('Delete clicked')}
          sx={{
            position: 'absolute',
            bottom: 156,
            right: 16,
          }}
        >
          <DeleteIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default FabActions;
