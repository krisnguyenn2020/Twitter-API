import { Router } from "express";
import { serveImageController } from "~/controllers/medias.controllers";

const staticRouter = Router();

staticRouter.get('/static', serveImageController)

export default staticRouter;