import express from "express";
import { GostController } from "../controllers/gost.controller";

const gostRouter = express.Router();

gostRouter.route("/registracija").post((req, res) => new GostController().registracija(req, res))

gostRouter.route("/dohvatiSve").get((req, res) => new GostController().dohvatiSve(req, res))

gostRouter.route("/dohvatiAktivne").get((req, res) => new GostController().dohvatiAktivne(req, res))

gostRouter.route("/dohvatiZahteve").get((req, res) => new GostController().dohvatiZahteve(req, res))

gostRouter.route("/prihvatiZahtev").post((req, res) => new GostController().prihvatiZahtev(req, res))

gostRouter.route("/odbijZahtev").post((req, res) => new GostController().odbijZahtev(req, res))

export default gostRouter;