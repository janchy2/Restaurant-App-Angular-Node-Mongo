import * as express from "express";
import Korisnik from "../models/korisnik";
import bcrypt from 'bcrypt';
import { ObjectId } from "mongodb";

export class KonobarController {

  registracija = async (req: express.Request, res: express.Response) => {

    let lozinka = req.body.lozinka;
    lozinka = await bcrypt.hash(lozinka, 5);

    let konobar = {
      kor_ime: req.body.kor_ime,
      lozinka: lozinka,
      pitanje: req.body.pitanje,
      odgovor: req.body.odgovor,
      ime: req.body.ime,
      prezime: req.body.prezime,
      pol: req.body.pol,
      adresa: req.body.adresa,
      telefon: req.body.telefon,
      mejl: req.body.mejl,
      restoran: ObjectId.createFromHexString(req.body.restoran),
      tip: req.body.tip,
      slika: req.body.slika
    }
    new Korisnik(konobar).save().then(ok => {
      res.json({ message: "ok" })
    }).catch(err => {
      console.log(err)
    })
  };

  dohvatiSve = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'K' }).then((konobari) => {
      res.json(konobari);
    })
      .catch((err) => {
        console.log(err);
      });
  };

}
