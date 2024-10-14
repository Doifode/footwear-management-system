import { registerCustomerValidator } from "../validators/customer.js";
import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";

export const registerCustomer = async (req, res, next) => {
    try {
        const error = registerCustomerValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { firstName, lastName, mobileNo } = req.body;
        const shopId = req.user.shopId
        const createdBy = req.user.userId

        const registerCustomerQuery = `CALL REGISTER_CUSTOMER('${firstName}','${lastName}','${mobileNo}','${shopId}','${createdBy}')`;
        DB.query(registerCustomerQuery, (error, result) => {
            if (error) return next(error);
            if (result[0]?.length) {
                return ResponseHandler.success(res, "Customer added successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200, result);
            }
        });
    } catch (error) {
        return next(error);
    }
};

export const getAllCustomers = async (req, res, next) => {
    try {
        const shopId = req.user.shopId
        const registerCustomerQuery = `CALL GET_ALL_CUSTOMERS('${shopId}')`;
        DB.query(registerCustomerQuery, (error, result) => {
            if (error) return next(error);
            if (result[0]?.length) {
                return ResponseHandler.success(res, "", 200, result[0]);
            } else {
                return ResponseHandler.success(res, "", 200, []);
            }
        });
    } catch (error) {
        return next(error);
    }
};