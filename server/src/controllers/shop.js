import DB from "../dbConnection.js"
import { getAllShopsQuery } from "../utils/sqlQueries.js";
import { registerShopValidator } from "../validators/shop.js";
import Response from "../utils/ResponseHandler.js"

export const getAllShops = (_, res, next) => {
    try {
        DB.query(getAllShopsQuery, (error, response) => {
            if (error) return Response.error(res, error, 500)
            if (response?.length) return Response.success(res, "", 200, response)
            if (response?.length === 0) return Response.success(res, "No records found.", 200, [])
        })
    } catch (error) {
        return next(error)
    }
};

export const registerShop = (req, res, next) => {
    try {
        const error = registerShopValidator.safeParse(req.body);
        if (!error.success) {
            return Response.error(res, error.error.issues[0].message, 400)
        }

        const { shopName, userName, state, district, city, landMark, tahsil } = req.body;
        const registerShopQuery = `CALL register_shop('${shopName}','${userName}','${state}','${city}','${district}','${tahsil}','${landMark}')`;

        DB.query(registerShopQuery, (registerShopError, registerShopSuccess) => {
            if (registerShopError) {
                return next(registerShopError);
            };
            return Response.success(res, "Shop registered successfully.", 200, registerShopSuccess[0][0])
        })

    } catch (error) {
        return next(error)
    }
};

export const getShopById = (req, res, next) => {
    try {
        const shopId = req.params.id;
        const getShopBdIdQuery = `CALL GET_SHOP_BY_ID(${shopId})`;
        DB.query(getShopBdIdQuery, (getShopByIdError, getShopByIdResult) => {
            if (getShopByIdError) return next(getShopByIdError);
            return Response.success(res, "Success", 200, getShopByIdResult[0][0]);
        })
    } catch (error) {
        return next(error)
    }
};

export const updateShopById = (req, res, next) => {
    try {
        const error = registerShopValidator.safeParse(req.body);
        if (!error.success) {
            return Response.error(res, error.error.issues[0].message, 400)
        };
        const shopId = req.params.id;

        const { shopName, userName, state, district, city, landMark, tahsil } = req.body;
        const updateShopByIdShopQuery = `CALL UPDATE_SHOP_BY_ID('${shopName}','${userName}','${state}','${city}','${district}','${tahsil}','${landMark}','${shopId}')`;

        DB.query(updateShopByIdShopQuery, (updateShopByIdShopError, updateShopByIdSuccess) => {
            if (updateShopByIdShopError) {
                return next(updateShopByIdShopError);
            };
            return Response.success(res, "Shop updated successfully.", 200, updateShopByIdSuccess[0][0])
        })

    } catch (error) {
        return next(error)
    }
};

export const deleteShopById = (req, res, next) => {
    try {
        const shopId = req.params.id;
        const deleteShopBdIdQuery = `CALL DELETE_SHOP_BY_ID(${shopId})`;
        DB.query(deleteShopBdIdQuery, (error, result) => {
            if (error) return next(error);
            return Response.success(res, "Success", 200, result[0][0]);
        })
    } catch (error) {
        return next(error)
    }
};

export const disableShopById = (req, res, next) => {
    try {
        const shopId = req.params.id;
        const deleteShopBdIdQuery = `CALL DISABLE_SHOP_BY_ID(${shopId})`;
        DB.query(deleteShopBdIdQuery, (error, result) => {
            if (error) return next(error);
            return Response.success(res, "Success", 200, result[0][0]);
        })
    } catch (error) {
        return next(error)
    }
}
export const restoreShopById = (req, res, next) => {
    try {
        const shopId = req.params.id;
        const deleteShopBdIdQuery = `CALL RESTORE_SHOP_BY_ID(${shopId})`;
        DB.query(deleteShopBdIdQuery, (error, result) => {
            if (error) return next(error);
            return Response.success(res, "Success", 200, result[0][0]);
        })
    } catch (error) {
        return next(error)
    }
}