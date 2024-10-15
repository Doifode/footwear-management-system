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

export const getAllBillsByMainBill = async (req, res, next) => {
    try {
        const mainBillId = req.params.id
        const getBillByMainBillQuery = `CALL GET_BILLS_BY_MAIN_BILL_ID(${mainBillId})`;

        DB.query(getBillByMainBillQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length)
                return ResponseHandler.success(res, "", 200, result[0]);
            else
                return ResponseHandler.success(res, "", 200, []);
        });
    } catch (error) {
        return next(error);
    }
};