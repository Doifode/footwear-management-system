import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

interface SideBarItemsProps {
    label: string,
    icon?: React.ReactNode,
    navigate?: () => void,
    isActive?: boolean,
    isHidden: boolean
}

export const SideBarListItems: React.FC<SideBarItemsProps> = ({ label, navigate, isActive, isHidden }) => {
    return (
        <List
            hidden={isHidden}
            sx={{ width: '100%', maxWidth: 360, }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={navigate} className={`${isActive ? "bg-white" : ""} rounded p-1 mx-2`}>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </List>
    );
}
