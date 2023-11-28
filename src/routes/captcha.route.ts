import express from "express";
import capchaControllers from "../controllers/captcha.controller";

const captchaRouter = express.Router();

captchaRouter.get("/test/:width?/:height?/", capchaControllers.getTestCaptcha);

captchaRouter.get("/:width?/:height?/", capchaControllers.getCaptcha);

captchaRouter.post("/", capchaControllers.verifyCaptcha);

export default captchaRouter;
