import * as express from "express";
import Korisnik from "../models/korisnik";
import bcrypt from 'bcrypt';

export class KorisnikController {

    dohvatiSve = (req: express.Request, res: express.Response) => {
        Korisnik.find({}).then((gosti) => {
            res.json(gosti);
        }).catch((err) => {
            console.log(err);
        });
    };

    prijava = async (req: express.Request, res: express.Response) => {
        Korisnik.findOne({
            kor_ime: req.body.kor_ime
        }).then(async (korisnik) => {
            if (!korisnik || !korisnik.lozinka) {
                return res.json(null);
            }
            let dobra_lozinka = await bcrypt.compare(req.body.lozinka, korisnik.lozinka);
            if (!dobra_lozinka) {
                return res.json(null);
            }
            res.json(korisnik);
        }).catch((err) => {
            console.log(err)
        });
    };

    dohvatiPoKorImenu = (req: express.Request, res: express.Response) => {
        Korisnik.findOne({ kor_ime: req.body.kor_ime }).then((korisnik) => {
            res.json(korisnik);
        }).catch((err) => {
            console.log(err);
        });
    };

    promenaLozinke = async (req: express.Request, res: express.Response) => {
        let lozinka = req.body.lozinka;
        lozinka = await bcrypt.hash(lozinka, 5);
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { lozinka: lozinka }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    azurirajPodatak = (req: express.Request, res: express.Response) => {
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { [req.body.polje]: req.body.vrednost }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    azurirajSliku = (req: express.Request, res: express.Response) => {
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { slika: req.body.vrednost }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    deaktivirajKorisnika = (req: express.Request, res: express.Response) => {
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { aktivan: false }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    odblokirajKorisnika = (req: express.Request, res: express.Response) => {
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { aktivan: true }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    dodajNeispunjenuRez = (req: express.Request, res: express.Response) => {
        Korisnik.findOneAndUpdate({ kor_ime: req.body.kor_ime }, { neispunjene_rez: req.body.neispunjene_rez }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

}
