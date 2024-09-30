import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerArticleValidator } from "../validators/article.js";

export const registerArticle = async (req, res, next) => {
    try {
        const error = registerArticleValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { articleName, brandId } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerArticleQuery = `CALL REGISTER_ARTICLE('${articleName}','${brandId}','${createdBy}','${shopId}')`;
        DB.query(registerArticleQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Article added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error)
    }
};

export const getArticlesByShopId = async (req, res, next) => {
    try {
        const shopId = req.user.shopId;
        const getArticlesByShopIdQuery = `CALL GET_ALL_ARTICLES(${shopId})`
        DB.query(getArticlesByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
}; 