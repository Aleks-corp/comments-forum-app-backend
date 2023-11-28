import { Router } from "express";
import captchaRoutes from "./captcha.route";
import commentsController from "../controllers/comments.controller";

const commentsRouter: Router = Router();

commentsRouter.use("/captcha", captchaRoutes);

commentsRouter.get("/", commentsController.getComments);
commentsRouter.get("/:id", commentsController.getRepliesComments);
commentsRouter.post("/", commentsController.postNewComment);
commentsRouter.post("/:id", commentsController.postReplyComment);

export default commentsRouter;
