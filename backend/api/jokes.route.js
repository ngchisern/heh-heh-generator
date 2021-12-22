import express from "express";
import JokesCtrl from "./jokes.controller.js";

const router = express.Router();

router.route("/").get(JokesCtrl.apiGetJokes);

export default router;
