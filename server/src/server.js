import express from "express";
import cors from "cors";
import shopRouter from "./routes/shop.js"
import userRouter from "./routes/user.js"
import categoryRoute from "./routes/category.js"
import authRouter from "./routes/auth.js"
import brandRouter from "./routes/brand.js"
import articleRouter from "./routes/article.js"
import productRouter from "./routes/product.js"
import colorRoute from "./routes/color.js"
import customerRoute from "./routes/customer.js"
import mainBillRoute from "./routes/mainBill.js"
import billRoute from "./routes/bill.js"
import paymentRoute from "./routes/payment.js"
import env from "dotenv";
import { errorHandler } from "./utils/ErrorHandler.js";
import { isAuthenticated } from "./utils/middlewares/isAuthenticated.js";
import { checkRoleMatching } from "./utils/middlewares/checkRole.js";
env.configDotenv({ path: "./env" });

// import statements 
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/shop/", isAuthenticated, checkRoleMatching(1), shopRouter);
app.use("/api/user/", isAuthenticated, checkRoleMatching(1, 2), userRouter);
app.use("/api/category/", isAuthenticated, checkRoleMatching(2), categoryRoute);
app.use("/api/brand/", isAuthenticated, checkRoleMatching(2), brandRouter);
app.use("/api/article/", isAuthenticated, checkRoleMatching(2), articleRouter);
app.use("/api/product/", isAuthenticated, checkRoleMatching(2), productRouter);
app.use("/api/color/", isAuthenticated, checkRoleMatching(2), colorRoute);
app.use("/api/customer/", isAuthenticated, checkRoleMatching(2, 3), customerRoute);
app.use("/api/mainBill/", isAuthenticated, checkRoleMatching(2, 3), mainBillRoute);
app.use("/api/payment/", isAuthenticated, checkRoleMatching(2, 3), paymentRoute);
app.use("/api/bill/", isAuthenticated, checkRoleMatching(2, 3), billRoute);
app.use("/api/auth/", authRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 2304, () => {
    try {
        console.log("server running on port", process.env.PORT);
    } catch (error) {
        console.log(error);
    }
});