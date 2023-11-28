import { Request, Response, NextFunction } from "express";

export type CtrlFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const ctrlWrapper =
  (ctrl: CtrlFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default ctrlWrapper;
