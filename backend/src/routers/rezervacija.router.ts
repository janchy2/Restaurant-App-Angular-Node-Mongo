import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();

rezervacijaRouter.route("/dodajRezervaciju").post((req, res) => new RezervacijaController().dodajRezervaciju(req, res))

rezervacijaRouter.route("/dostupnostStolova").post((req, res) => new RezervacijaController().dostupnostStolova(req, res))

rezervacijaRouter.route("/dohvatiNeobradjene").post((req, res) => new RezervacijaController().dohvatiNeobradjene(req, res))

rezervacijaRouter.route("/dohvatiZaKonobara").post((req, res) => new RezervacijaController().dohvatiZaKonobara(req, res))

rezervacijaRouter.route("/prihvatiForma").post((req, res) => new RezervacijaController().prihvatiForma(req, res))

rezervacijaRouter.route("/prihvatiPanel").post((req, res) => new RezervacijaController().prihvatiPanel(req, res))

rezervacijaRouter.route("/odbij").post((req, res) => new RezervacijaController().odbij(req, res))

rezervacijaRouter.route("/potvrdiDolazak").post((req, res) => new RezervacijaController().potvrdiDolazak(req, res))

rezervacijaRouter.route("/potvrdiNedolazak").post((req, res) => new RezervacijaController().potvrdiNedolazak(req, res))

rezervacijaRouter.route("/produzi").post((req, res) => new RezervacijaController().produzi(req, res))

rezervacijaRouter.route("/moguceProduzenje").post((req, res) => new RezervacijaController().moguceProduzenje(req, res))

rezervacijaRouter.route("/brojNeispunjenihZaGosta").post((req, res) => new RezervacijaController().brojNeispunjenihZaGosta(req, res))

rezervacijaRouter.route("/dohvatiAktuelneZaGosta").post((req, res) => new RezervacijaController().dohvatiAktuelneZaGosta(req, res))

rezervacijaRouter.route("/dohvatiIstekleZaGosta").post((req, res) => new RezervacijaController().dohvatiIstekleZaGosta(req, res))

rezervacijaRouter.route("/otkazi").post((req, res) => new RezervacijaController().otkazi(req, res))

rezervacijaRouter.route("/oceni").post((req, res) => new RezervacijaController().oceni(req, res))

rezervacijaRouter.route("/statistika1").post((req, res) => new RezervacijaController().statistika1(req, res))

rezervacijaRouter.route("/statistika2").post((req, res) => new RezervacijaController().statistika2(req, res))

rezervacijaRouter.route("/statistika3").get((req, res) => new RezervacijaController().statistika3(req, res))

rezervacijaRouter.route("/dohvatiRezervacijeDan").get((req, res) => new RezervacijaController().dohvatiRezervacijeDan(req, res))

rezervacijaRouter.route("/dohvatiRezervacijeNedelja").get((req, res) => new RezervacijaController().dohvatiRezervacijeNedelja(req, res))

rezervacijaRouter.route("/dohvatiRezervacijeMesec").get((req, res) => new RezervacijaController().dohvatiRezervacijeMesec(req, res))


export default rezervacijaRouter;