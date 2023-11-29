import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import generate from "../utils/captcha-generate.util";
import ctrlWrapper from "../middleware/ctrl-wrapper";

const getTestCaptcha = (req: Request, res: Response) => {
  const { width: widthReq, height: heightReq } = req.params;
  const size = {
    width: 200,
    height: 100,
  };
  if (widthReq) {
    size.width = parseInt(widthReq);
  }
  if (heightReq) {
    size.height = parseInt(heightReq);
  }
  const { image } = generate(size.width, size.height);
  res.send(`<img class="generated-captcha" src="${image}">`);
};

const getCaptcha = (req: Request, res: Response) => {
  const { width: widthReq, height: heightReq } = req.params;
  const size = {
    width: 200,
    height: 100,
  };
  if (widthReq) {
    size.width = parseInt(widthReq);
  }
  if (heightReq) {
    size.height = parseInt(heightReq);
  }
  const { image, text } = generate(size.width, size.height);
  bcrypt.hash(text, 10, (err, hash) => {
    if (err) {
      res.send({ error: "Error generating the captcha. Please try again." });
    } else {
      res.json({ image, hash });
    }
  });
};

const verifyCaptcha = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.compare(req.body.captcha, req.body.hash, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error in captcha verification" });
    } else if (result) {
      res.status(200).json({ message: "Verification successful" });
      //   next();
    } else {
      res.status(400).json({ message: "Invalid captcha" });
    }
  });
};

export default {
  getTestCaptcha: ctrlWrapper(getTestCaptcha),
  getCaptcha: ctrlWrapper(getCaptcha),
  verifyCaptcha: ctrlWrapper(verifyCaptcha),
};
