import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({
    message: "Pong 🏓",
  });

  next();
});

export default app;
