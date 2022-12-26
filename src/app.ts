import * as dotenv from "dotenv";
import express from "express";
import { pdfTemplate } from "./template/pdf-template";
import { uploadStreamToGcs } from "./utils/uploadStreamToGcs";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health-check", async (req, res) => {
  res.status(200).send({ message: "PDF Generator Service" });
});

app.post("/", async (req, res) => {
  try {
    // Feel free to use this body variable to pass data to your template
    const body = req.body;

    const pdfStream = await pdfTemplate();
    const url = await uploadStreamToGcs(pdfStream);

    res.status(200).send({
      message: "PDF Generator Service",
      url,
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
