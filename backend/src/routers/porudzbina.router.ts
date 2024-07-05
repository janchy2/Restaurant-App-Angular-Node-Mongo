import express from "express";
import { PorudzbinaController } from "../controllers/porudzbina.controller";

const porudzbinaRouter = express.Router();

porudzbinaRouter.route("/dodajPorudzbinu").post((req, res) => new PorudzbinaController().dodajPorudzbinu(req, res))

porudzbinaRouter.route("/dohvatiZaRestoran").post((req, res) => new PorudzbinaController().dohvatiZaRestoran(req, res))

porudzbinaRouter.route("/prihvati").post((req, res) => new PorudzbinaController().prihvati(req, res))

porudzbinaRouter.route("/odbij").post((req, res) => new PorudzbinaController().odbij(req, res))

porudzbinaRouter.route("/dohvatiAktuelneZaGosta").post((req, res) => new PorudzbinaController().dohvatiAktuelneZaGosta(req, res))

porudzbinaRouter.route("/dohvatiArhivuZaGosta").post((req, res) => new PorudzbinaController().dohvatiArhivuZaGosta(req, res))

export default porudzbinaRouter;