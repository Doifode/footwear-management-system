import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerColorValidator } from "../validators/color.js";

export const registerColor = async (req, res, next) => {
    try {
        const error = registerColorValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { colorName,colorCode } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerColorQuery = `CALL REGISTER_COLOR('${colorName}','${colorCode}','${createdBy}','${shopId}')`;
        DB.query(registerColorQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Color added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error)
    }
};

export const getColorsByShopId = async (req, res, next) => {
    try {
        const shopId = req.user.shopId;
        const getColorsByShopIdQuery = `CALL GET_ALL_COLORS(${shopId})`
        DB.query(getColorsByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
}; 