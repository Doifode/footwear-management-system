import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerBrandValidator } from "../validators/Brand.js";

export const registerBrand = async (req, res, next) => {
    try {
        const error = registerBrandValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { brandName } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerBrandQuery = `CALL REGISTER_BRAND('${brandName}','${createdBy}','${shopId}')`;
        DB.query(registerBrandQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Brand added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error)
    }
};

export const getBrandsByShopId = async (req, res, next) => {
    try {
        const shopId = req.user.shopId;
        const getBrandsByShopIdQuery = `CALL GET_ALL_BRANDS(${shopId})`
        DB.query(getBrandsByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
}; 