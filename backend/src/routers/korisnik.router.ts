import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korisnikRouter = express.Router();

korisnikRouter.route("/dohvatiSve").get((req, res) => new KorisnikController().dohvatiSve(req, res))

korisnikRouter.route("/prijava").post((req, res) => new KorisnikController().prijava(req, res))

korisnikRouter.route("/dohvatiPoKorImenu").post((req, res) => new KorisnikController().dohvatiPoKorImenu(req, res))

korisnikRouter.route("/promenaLozinke").post((req, res) => new KorisnikController().promenaLozinke(req, res))

korisnikRouter.route("/azurirajPodatak").post((req, res) => new KorisnikController().azurirajPodatak(req, res))

korisnikRouter.route("/azurirajSliku").post((req, res) => new KorisnikController().azurirajSliku(req, res))

korisnikRouter.route("/deaktivirajKorisnika").post((req, res) => new KorisnikController().deaktivirajKorisnika(req, res))

korisnikRouter.route("/odblokirajKorisnika").post((req, res) => new KorisnikController().odblokirajKorisnika(req, res))

export default korisnikRouter;