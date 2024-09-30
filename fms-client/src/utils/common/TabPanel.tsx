import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ItemsTabsProps {
    props?: {
        component: React.ReactNode,
        index: number,
        label: string
    }[]
}

const TabPanels: React.FC<ItemsTabsProps> = ({ props }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {props?.map((item) => <Tab key={item.index} label={item.label} {...a11yProps(item.index)} />)}
                </Tabs>
            </Box>
            {props?.map((item) =>
                <CustomTabPanel key={item.index} value={value} index={item.index}>
                    {item.component}
                </CustomTabPanel>)
            }
        </Box>
    );
}


export default TabPanels