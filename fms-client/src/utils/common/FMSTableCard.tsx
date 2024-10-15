import { Box, Button, Typography } from "@mui/material"
import React from "react"
interface FMSTableCardProps {
    title: string,
    buttonLabel?: string,
    buttonClick?: () => void,
    children?: React.ReactNode
}
const FMSTableCard: React.FC<FMSTableCardProps> = ({ buttonClick, title, buttonLabel, children }) => {
    return (
        <Box className="my-4 mx-3"  >
            <Box className="py-2" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant='h5'> {title}</Typography>
                {buttonLabel ? <Button variant="contained" color="info" onClick={buttonClick}>{buttonLabel}</Button> : ""}
            </Box>
            {children ? children : ""}
        </Box>
    )
}

export default FMSTableCard
