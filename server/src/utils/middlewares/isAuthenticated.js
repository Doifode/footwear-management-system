import jwt from "jsonwebtoken";
import DB from "../../dbConnection.js"
import ResponseHandler from "../ResponseHandler.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return ResponseHandler.error(res, "Please login to access this data.", 200);
        const decodeToken = jwt.verify(authorization, process.env.SECRET);
        req.user = decodeToken;

        if (decodeToken.roleId === 1) {
            return next();
        }

        const isAuthenticatedQuery = `CALL IS_AUTHENTICATED('${decodeToken.userId}',${decodeToken.shopId})`
        DB.query(isAuthenticatedQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return next();
            }
        })

    } catch (error) {
        return next(error)
    }
}