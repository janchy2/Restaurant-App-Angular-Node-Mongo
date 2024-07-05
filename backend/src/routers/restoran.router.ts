import express from "express";
import { RestoranController } from "../controllers/restoran.controller";

const restoranRouter = express.Router();

restoranRouter.route("/dodajRestoran").post((req, res) => new RestoranController().dodajRestoran(req, res))

restoranRouter.route("/dohvatiSve").get((req, res) => new RestoranController().dohvatiSve(req, res))

restoranRouter.route("/dodajRadnoVreme").post((req, res) => new RestoranController().dodajRadnoVreme(req, res))

restoranRouter.route("/dohvatiPoId").post((req, res) => new RestoranController().dohvatiPoId(req, res))

restoranRouter.route("/dodajOcenu").post((req, res) => new RestoranController().dodajOcenu(req, res))

restoranRouter.route("/dohvatiBrojRestorana").get((req, res) => new RestoranController().dohvatiBrojRestorana(req, res))

restoranRouter.route("/dohvatiRestoraneSaKonobarima").get((req, res) => new RestoranController().dohvatiRestoraneSaKonobarima(req, res))


export default restoranRouter;