import ResponseHandler from "../ResponseHandler.js"

export const checkRoleMatching = (...role) => {
    return (req, res, next) => {

        if (role.includes(req.user.roleId)) {
            return next();
        } else {
            return ResponseHandler.error(res, "Not have permission.", 200)
        }
    }
}