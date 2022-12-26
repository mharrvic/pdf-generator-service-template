import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health-check", async (req, res) => {
  res.status(200).send({ message: "PDF Generator Service" });
});

app.post("/", async (req, res) => {
  try {
    res.status(200).send({
      message: "PDF Generator Service",
      url: "test",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app };
