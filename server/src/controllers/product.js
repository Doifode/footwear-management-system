import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { deleteProductValidator, getSizeProductBillingValidator, getSizeProductValidator, registerProductValidator } from "../validators/Product.js";

export const registerProduct = async (req, res, next) => {
    try {
        const error = registerProductValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { productName,
            articleId,
            mrp,
            actualPrice,
            size,
            quantity,
            discount,
            categoryId,
            colorId,
            sellingPrice } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerProductQuery = `CALL REGISTER_PRODUCT('${productName}','${articleId}','${mrp}','${actualPrice}','${size}','${quantity}','${discount}','${categoryId}','${colorId}','${shopId}','${createdBy}','${sellingPrice}')`;
        DB.query(registerProductQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Product added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error);
    }
};

export const getProductByShopId = async (req, res, next) => {
    try {
        const shopId = req.user.shopId;
        const getProductByShopIdQuery = `CALL GET_ALL_PRODUCTs(${shopId})`
        DB.query(getProductByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const error = registerProductValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { productName,
            articleId,
            mrp,
            actualPrice,
            size,
            quantity,
            discount,
            categoryId,
            colorId,
            sellingPrice, productId } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId
        const updateProductQuery = `CALL UPDATE_PRODUCT('${productName}',${articleId},${mrp},${actualPrice},${size},${quantity},${discount},${categoryId},${colorId},${shopId},${createdBy},${sellingPrice},${productId})`;
        DB.query(updateProductQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Product updated successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error);
    }
};

export const getProductSizeList = async (req, res, next) => {
    try {
        const error = getSizeProductValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const {
            productName,
            articleId,
            categoryId,
            colorId,
        } = req.body;
        const shopId = req.user.shopId

        const updateProductQuery = `CALL GET_PRODUCT_SIZE_AND_QUANTITY('${productName}','${categoryId}','${articleId}','${colorId}','${shopId}')`;
        DB.query(updateProductQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return ResponseHandler.success(res, "Product updated successfully!", 200, result[0]);
            }
        });
    } catch (error) {
        return next(error);
    }
};

export const searchProduct = async (req, res, next) => {
    try {
        const error = getSizeProductValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const {
            productName,
            articleId,
            categoryId,
            colorId,
        } = req.body;
        const shopId = req.user.shopId;

        const updateProductQuery = `CALL SEARCH_PRODUCTS(${productName.length ? `'${productName}'` : null},${categoryId ? categoryId : null},${articleId ? articleId : null},${colorId ? colorId : null},${shopId ? shopId : null})`;

        if (productName == "" && categoryId == 0 && articleId == 0 && colorId == 0) {
            getProductByShopId(req, res, next)
        } else {
            DB.query(updateProductQuery, (error, result) => {
                if (error) return next(error);
                if (result[0]?.length) {
                    return ResponseHandler.success(res, "", 200, result[0]);
                } else {
                    return ResponseHandler.error(res, "Products not found.", 200, [])
                }
            });
        }
    } catch (error) {
        return next(error);
    }
};
export const searchBillingProduct = async (req, res, next) => {
    try {
        const error = getSizeProductBillingValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const {
            articleId,
            colorId,
            size
        } = req.body;
        const shopId = req.user.shopId;

        const getProductToBillQuery = `CALL GET_PRODUCT_TO_BILL(${articleId},${colorId},${size},${shopId})`;
        DB.query(getProductToBillQuery, (error, result) => {
            if (error) return next(error);
            if (result[0]?.length) {
                return ResponseHandler.success(res, "", 200, result[0]);
            } else {
                return ResponseHandler.error(res, "Products not found.", 200, [])
            }
        });
    } catch (error) {
        return next(error);
    }
};



export const deleteProductById = async (req, res, next) => {
    try {
        const error = deleteProductValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }

        const {
            productId,
        } = req.body;

        const shopId = req.user.shopId;
        const deleteProductQuery = `CALL DELETE_PRODUCT(${productId},${shopId})`;

        DB.query(deleteProductQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "Product deleted successfully.", 200, result[0]);
        });
    } catch (error) {
        return next(error);
    }
};