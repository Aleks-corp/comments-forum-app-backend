import { Router } from "express";
import captchaRoutes from "./captcha.route";

const commentsRouter: Router = Router();

commentsRouter.use("/captcha", captchaRoutes);

export default commentsRouter;
