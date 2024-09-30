import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerCategoryValidator } from "../validators/category.js";

export const registerCategory = async (req, res, next) => {
    try {
        const error = registerCategoryValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { categoryName } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerCategoryQuery = `CALL REGISTER_CATEGORY('${categoryName}','${createdBy}','${shopId}')`;
        DB.query(registerCategoryQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Category added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error)
    }
};

export const getCategoriesByShopId = async (req, res, next) => {
    try {
        const shopId = req.user.shopId;
         const getCategoriesByShopIdQuery = `CALL GET_ALL_CATEGORIES(${shopId})`
        DB.query(getCategoriesByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const shopId = req.query.shopId;
        const getUserByIdQuery = `CALL GET_USER_BY_ID(${userId},${shopId})`
        DB.query(getUserByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return ResponseHandler.success(res, "", 200, result[0][0])
            } else {
                return ResponseHandler.error(res, "User not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const error = registerCategoryValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { firstName, lastName, shopId, mobileNo, email, roleId, userName, userId, activateUrl } = req.body;
        const registerCategoryQuery = `CALL UPDATE_USER_BY_ID('${userName}',${userId},'${mobileNo}','${shopId}','${email}','${firstName}','${lastName}',${roleId},'${req.user.userId}')`;
        DB.query(registerCategoryQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "User registered successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200)
            }
        });
    } catch (error) {
        return next(error)
    }
};
