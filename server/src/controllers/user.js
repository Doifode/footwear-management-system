import { registerUserValidator, resetPasswordValidator } from "../validators/user.js";
import DB from "../dbConnection.js"
import ResponseHandler from "../utils/ResponseHandler.js";
import bcryptjs from "bcryptjs"
export const registerUser = async (req, res, next) => {
    try {
        const error = registerUserValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { firstName, lastName, shopId, mobileNo, email, userName, createdBy, activateUrl } = req.body;
        const registerUserQuery = `CALL REGISTER_USER('${firstName}','${lastName}','${shopId}','${mobileNo}','${email}','${userName}','${createdBy}','${createdBy}')`;
        DB.query(registerUserQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "User registered successfully!", 200, `${activateUrl}/${result[0][0].activationToken}`);
        });
    } catch (error) {
        return next(error)
    }
};

export const setPassword = async (req, res, next) => {
    try {
        const error = resetPasswordValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        };
        const { password, token, } = req.body;
        const hashPassword = bcryptjs.hashSync(password, 10);
        const registerUserQuery = `CALL SET_PASSWORD('${token}','${hashPassword}')`;
        DB.query(registerUserQuery, (error, _result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "Password updated successfully!", 200,);
        });
    } catch (error) {
        return next(error);
    }
};

export const getUsersByShopId = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const getUsersByShopIdQuery = `CALL GET_USERS_BY_SHOP_ID(${shopId})`
        DB.query(getUsersByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        })

    } catch (error) {

    }
};

