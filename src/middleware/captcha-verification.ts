import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";

const verifyCaptcha = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.compare(req.body.captcha, req.body.hash, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error in captcha verification" });
    }
    if (result) {
      next();
    } else {
      res.status(200).json({ message: "Invalid captcha" });
    }
  });
};
export default verifyCaptcha;
