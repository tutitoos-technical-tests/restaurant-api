import { Router } from "express";
import routes from "../routes.js";
import { postThankYou } from "../../controllers/emailControllers/emailControllers.js";

const emailRouter = Router();
const { thanks } = routes.email;

emailRouter.post(thanks, postThankYou);

export default emailRouter;
