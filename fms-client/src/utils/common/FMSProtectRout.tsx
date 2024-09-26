import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IRootState } from "../../helper/types/CommonTypes";
import FMSPageNotFound from "./FMSPageNotFound";

interface FMSProtectRoutProps {
    children: React.ReactNode,
    accessArray: number[]
};

const FMSProtectRout: React.FC<FMSProtectRoutProps> = ({ children, accessArray }) => {
    const { token, roleId } = useSelector((state: IRootState) => state.Auth.userDetails);
    if ((!token && window.location.pathname !== "/auth/login")) {
        return <Navigate to={"/auth/login"}></Navigate>
    };
    if ((window.location.pathname == "/auth/login" && token)) {
        return <Navigate to={"/"}></Navigate>
    };
    if ((!accessArray.includes(roleId)) && (window.location.pathname !== "/auth/login")) {
        return <FMSPageNotFound
            statusCode={403}
            buttonLabel='Go Back'
            subTitle="You don't have access to this page. Please contact your shop owner."
            title="Access Forbidden !" />
    };

    return (<>{children}</>)
}

export default FMSProtectRout