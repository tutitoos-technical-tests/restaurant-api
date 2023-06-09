import { Router } from "express";
import { getPing } from "../../controllers/generalControllers/generalControllers.js";
import routes from "../routes.js";

const generalRouter = Router();
const { ping } = routes.general;

generalRouter.get(ping, getPing);

export default generalRouter;
