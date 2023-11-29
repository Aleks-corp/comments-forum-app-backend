import { Router } from "express";
import captchaRoutes from "./captcha.route";
import commentsController from "../controllers/comments.controller";
import verifyCaptcha from "../middleware/captcha-verification";
import commentAddSchema from "../schemas/comments.schema";
import validateBody from "../middleware/validate-body";

const commentsRouter: Router = Router();

commentsRouter.use("/captcha", captchaRoutes);

commentsRouter.get("/", commentsController.getComments);
commentsRouter.get("/:id", commentsController.getRepliesComments);
commentsRouter.post(
  "/",
  verifyCaptcha,
  validateBody(commentAddSchema),
  commentsController.postNewComment
);
commentsRouter.post(
  "/:id",
  verifyCaptcha,
  validateBody(commentAddSchema),
  commentsController.postReplyComment
);

export default commentsRouter;
