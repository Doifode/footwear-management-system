import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";

export const registerBill = async (req, res, next) => {
    try {

        const { productId, size, sellingPrice, mrp, discount, offeredDiscount, finalPrice, isPaid, paidAmount, actualPrice, remainingAmount, categoryName, articleName, brandName, colorName, productName, paymentId, statusId, mainBillId } = req.body;
        const createdBy = req.user.userId

        const registerBillQuery = `CALL REGISTER_BILL(${productId},${size},${sellingPrice},${mrp},${discount},${offeredDiscount},${finalPrice},${createdBy},${isPaid},${paidAmount},${actualPrice},${remainingAmount},'${categoryName}','${articleName}','${brandName}','${colorName}','${productName}',${paymentId},${statusId},${mainBillId})`;

        DB.query(registerBillQuery, (error, result) => {
            if (error) return next(error);
            if (result)
                return ResponseHandler.success(res, "Bill added successfully!", 200, result);
        });
    } catch (error) {
        return next(error);
    }
};