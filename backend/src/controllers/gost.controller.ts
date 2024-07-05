import * as express from "express";
import Korisnik from "../models/korisnik";
import bcrypt from 'bcrypt';

export class GostController {

  registracija = async (req: express.Request, res: express.Response) => {

    let lozinka = req.body.lozinka
    lozinka = await bcrypt.hash(lozinka, 5)

    let gost = {
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
      slika: req.body.slika,
      prihvacen: false,
      aktivan: false,
      tip: req.body.tip,
      broj_kartice: req.body.broj_kartice
    }
    new Korisnik(gost).save().then(ok => {
      res.json({ message: "ok" })
    }).catch(err => {
      console.log(err)
    });
  };

  dohvatiSve = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'G', prihvacen: true }).then((gosti) => {
      res.json(gosti);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  dohvatiAktivne = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'G', aktivan: true }).then((gosti) => {
      res.json(gosti);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  prihvatiZahtev = (req: express.Request, res: express.Response) => {
    Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { aktivan: true, prihvacen: true }).then(() => {
      res.json("ok");
    }).catch((err) => {
      console.log(err);
    });
  };

  odbijZahtev = (req: express.Request, res: express.Response) => {
    Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { aktivan: false, prihvacen: true }).then(() => {
      res.json("ok");
    }).catch((err) => {
      console.log(err);
    });
  };

  dohvatiZahteve = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'G', prihvacen: false }).then((gosti) => {
      res.json(gosti);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  dohvatiBrojGostiju = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'G', prihvacen: true }).then((gosti) => {
      res.json(gosti.length);
    })
      .catch((err) => {
        console.log(err);
      });
  };

}
