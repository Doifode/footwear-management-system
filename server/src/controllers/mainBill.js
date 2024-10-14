import DB from "../dbConnection.js"
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerMainBillValidator } from "../validators/mainBill.js";

export const registerMainBill = async (req, res, next) => {
    try {
        const error = registerMainBillValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        };

        const { itemQuantity, totalAmount, paidAmount, isPaid, customerId, grandTotal } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerMainBillQuery = `CALL REGISTER_MAIN_BILL('${itemQuantity}','${totalAmount}','${paidAmount}','${isPaid}','${createdBy}','${customerId}','${shopId}','${grandTotal}')`;
        DB.query(registerMainBillQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return ResponseHandler.success(res, "Bill added successfully!", 200, result[0][0]);
            }
        });
    } catch (error) {
        return next(error)
    }
};