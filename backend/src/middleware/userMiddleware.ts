import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/index";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.tasky;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};