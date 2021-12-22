import express from "express";
import FactsCtrl from "./facts.controller.js";

const router = express.Router();

router.route("/").get(FactsCtrl.apiGetFacts);

export default router;
