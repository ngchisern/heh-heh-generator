import express from "express";
import cors from "cors";
import jokes from "./api/jokes.route.js";
import pickUpLines from "./api/pickUpLines.route.js";
import facts from "./api/facts.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/jokes", jokes);
app.use("/api/v1/pick-up-lines", pickUpLines);
app.use("/api/v1/facts", facts);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
