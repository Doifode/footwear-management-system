import DB from "../dbConnection.js";
import Response from "../utils/ResponseHandler.js";
import { getAllPaymentMethods } from "../utils/sqlQueries.js";

export const getAllPaymentTypes = (_, res, next) => {
    try {
        DB.query(getAllPaymentMethods, (error, response) => {
            if (error) return Response.error(res, error, 500)
            if (response?.length) return Response.success(res, "", 200, response)
            if (response?.length === 0) return Response.success(res, "No records found.", 200, [])
        })
    } catch (error) {
        return next(error)
    }
};