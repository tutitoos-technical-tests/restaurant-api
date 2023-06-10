import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalRouter, orderRouter, emailRouter } from "./routers/index.js";
import routes from "./routers/routes.js";
import { generalError, notFoundEndpoint } from "./middlewares/errors.js";
import path from "path";
import favicon from "serve-favicon";
import { getPathname } from "../utils/paths.js";

const { general, order, email } = routes;

const pathname = getPathname();
const app = express();

app.use(favicon(path.join(pathname, "public", "favicon.jpeg")));
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
