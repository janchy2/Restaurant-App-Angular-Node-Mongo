import express from "express";
import { KonobarController } from "../controllers/konobar.controller";

const konobarRouter = express.Router();

konobarRouter.route("/registracija").post((req, res) => new KonobarController().registracija(req, res))

konobarRouter.route("/dohvatiSve").get((req, res) => new KonobarController().dohvatiSve(req, res))

export default konobarRouter;