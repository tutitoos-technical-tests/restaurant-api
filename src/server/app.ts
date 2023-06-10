import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalRouter, orderRouter, emailRouter } from "./routers/index.js";
import routes from "./routers/routes.js";
import { generalError, notFoundEndpoint } from "./middlewares/errors.js";
import path from "path";
import url from "url";
import favicon from "serve-favicon";

const { general, order, email } = routes;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(favicon(path.join(__dirname, "../../public", "favicon.jpeg")));
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(general.root, generalRouter);
app.use(order.root, orderRouter);
app.use(email.root, emailRouter);

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
