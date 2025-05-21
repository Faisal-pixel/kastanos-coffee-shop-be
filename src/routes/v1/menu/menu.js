import express from "express";
import { getMenuItems } from "../../../controllers/v1/menu/menu.controllers.js";

const router = express.Router();

router.get("/", getMenuItems);

export default router;
