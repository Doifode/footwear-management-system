import express from "express";
import cors from "cors";
import shopRouter from "./routes/shop.js"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
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
app.use("/api/auth/", authRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 2324, () => {
    try {
        console.log("server running on port", process.env.PORT);
    } catch (error) {
        console.log(error);
    }
});