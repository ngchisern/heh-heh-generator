import express from "express";
import PickUpLinesCtrl from "./pickUpLines.controller.js";

const router = express.Router();

router.route("/").get(PickUpLinesCtrl.apiGetPickUpLines);

export default router;
