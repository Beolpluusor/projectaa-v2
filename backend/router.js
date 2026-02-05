import express from "express";
import { authMiddleware } from "./authMiddleware.js";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Pääsit sisään!", user: req.user });
});

export default router;