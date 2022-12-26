import * as dotenv from "dotenv";
import express from "express";
import { pdfTemplate } from "./template/pdf-template";

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

app.get("/test", async (req, res) => {
  try {
    const pdfStream = await pdfTemplate();
    res.setHeader("Content-Type", "application/pdf");
    pdfStream.pipe(res);
    pdfStream.on("end", () => console.log("Done streaming, response sent."));
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app };
