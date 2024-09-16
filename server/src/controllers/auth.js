import { verifyUserValidator } from "../validators/auth.js";
import DB from "../dbConnection.js"
import ResponseHandler from "../utils/ResponseHandler.js";
export const verifyUser = (req, res, next) => {
    try {
        const { identifier, shopUserName, password } = req.body;
        const error = verifyUserValidator.safeParse(req.body);

        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const verifyUserQuery = `CALL VERIFY_USER('${identifier}','${shopUserName}');`;

        DB.query(verifyUserQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result)
        });

    } catch (error) {
        return next(error)
    }
}