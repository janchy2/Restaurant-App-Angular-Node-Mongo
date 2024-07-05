import * as express from "express";
import Restoran from "../models/restoran";
import { ObjectId } from "mongodb";

export class RestoranController {

    dodajRestoran = (req: express.Request, res: express.Response) => {
        let restoran = {
            naziv: req.body.naziv,
            adresa: req.body.adresa,
            kontakt_osoba: req.body.kontakt_osoba,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            tip: req.body.tip,
            raspored: req.body.raspored,
            radnoVreme: '',
            zbir_ocena: 0,
            broj_ocena: 0,
            jelovnik: req.body.jelovnik
        };

        new Restoran(restoran).save().then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });

    };

    dohvatiSve = (req: express.Request, res: express.Response) => {
        Restoran.find({}).then((restorani) => {
            res.json(restorani);
        }).catch((err) => {
            console.log(err);
        });
    };

    dodajRadnoVreme = (req: express.Request, res: express.Response) => {
        Restoran.findOneAndUpdate({ naziv: req.body.naziv, adresa: req.body.adresa }, { radno_vreme: req.body.radno_vreme }).then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiPoId = (req: express.Request, res: express.Response) => {
        Restoran.findOne({ _id: ObjectId.createFromHexString(req.body.id) }).then((restoran) => {
            res.json(restoran);
        }).catch((err) => {
            console.log(err);
        });
    };

    dodajOcenu = (req: express.Request, res: express.Response) => {
        Restoran.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { zbir_ocena: req.body.zbir_ocena, broj_ocena: req.body.broj_ocena }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };
}
