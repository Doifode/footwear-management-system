import { verifyUserValidator } from "../validators/auth.js";
import DB from "../dbConnection.js"
import ResponseHandler from "../utils/ResponseHandler.js";
import { resetPasswordValidator } from "../validators/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    try {

        const { identifier } = req.body;
        const error = verifyUserValidator.safeParse(req.body);

        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        };

        const verifyUserQuery = `CALL VERIFY_USER('${identifier}');`;
        DB.query(verifyUserQuery, async (error, result) => {
            if (error) return next(error);
            if (result[0]?.length) {
                return handleVerifyUserResponse(req, res, next, result);
            } else {
                return ResponseHandler.error(res, result, 200)
            }
        });

    } catch (error) {
        return next(error);
    }
};

const handleVerifyUserResponse = async (req, res, next, result) => {
    try {
        const comparePassword = await bcryptjs.compare(req.body.password, result[0][0].password);
        if (comparePassword) {
            const { password, activationToken, ...userDetails } = result[0][0]
            const token = jwt.sign(userDetails, process.env.SECRET, { expiresIn: "10 days" })
            return ResponseHandler.success(res, "Login successful.", 200, { token, ...userDetails });
        } else {
            return ResponseHandler.error(res, "Invalid Credentials.", 200, result);
        }
    } catch (error) {
        return next(error);
    }
}

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