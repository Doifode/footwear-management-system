import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useTheme } from '@mui/material/styles';

interface SideBarItemsProps {
    label: string;
    icon?: React.ReactNode;
    navigate?: () => void;
    isActive?: boolean;
    isHidden: boolean;
}

export const SideBarListItems: React.FC<SideBarItemsProps> = ({
    label,
    navigate,
    isActive = false,
    isHidden
}) => {
    // Use MUI theme to detect current mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <List
            hidden={isHidden}
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton
                onClick={navigate}
                sx={{
                    backgroundColor: isActive
                        ? isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)' // Active background for dark mode
                            : 'rgba(0, 0, 0, 0.1)'     // Active background for light mode
                        : 'transparent',
                    borderRadius: '4px',
                    marginX: 1,
                    '&:hover': {
                        backgroundColor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.2)' // Hover effect for dark mode
                            : 'rgba(0, 0, 0, 0.2)',     // Hover effect for light mode
                    }
                }}
            >
                <ListItemIcon>
                    <SendIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    sx={{ color: isDarkMode ? '#fff' : '#000' }} // Text color based on mode
                />
            </ListItemButton>
        </List>
    );
};
