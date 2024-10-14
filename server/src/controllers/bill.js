import DB from "../dbConnection.js"
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerBillValidator } from "../validators/Bill.js";

export const registerBill = async (req, res, next) => {
    try {

        const error = registerBillValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        };

        const { productId, size, sellingPrice, mrp, discount, offeredDiscount, finalPrice, isPaid, paidAmount, actualPrice, remainingAmount, categoryName, articleName, brandName, colorName, productName, paymentId, statusId, mainBillId } = req.body;
        const createdBy = req.user.userId

        const registerBillQuery = `CALL REGISTER_BILL(${productId},${size},${sellingPrice},${mrp},${discount},${offeredDiscount},${finalPrice},${createdBy},${isPaid},${paidAmount},${actualPrice},${remainingAmount},${categoryName},${articleName},${brandName},${colorName},${productName},${paymentId},${statusId},${mainBillId})`;
        DB.query(registerBillQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return ResponseHandler.success(res, "Bill added successfully!", 200, result);
            }
        });
    } catch (error) {
        return next(error);
    }
};