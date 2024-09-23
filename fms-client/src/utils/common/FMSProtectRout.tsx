import { useSelector } from "react-redux"
import { IRootState } from "../../helper/types/CommonTypes";
import { Navigate } from "react-router-dom";
import React from "react";

interface FMSProtectRoutProps {
    children: React.ReactNode
};

const FMSProtectRout: React.FC<FMSProtectRoutProps> = ({ children }) => {
    const state = useSelector((state: IRootState) => state.Auth.userDetails.token);

    if (!state) {
        return <Navigate to={"/auth/login"}></Navigate>
    };

    return (<>{children}</>)
}

export default FMSProtectRout