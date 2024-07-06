import express from "express";
import Porudzbina from "../models/porudzbina";
import { ObjectId } from "mongodb";

export class PorudzbinaController {
    dodajPorudzbinu = (req: express.Request, res: express.Response) => {
        let porudzbina = {
            korisnikId: ObjectId.createFromHexString(req.body.korisnikId),
            restoranId: ObjectId.createFromHexString(req.body.restoranId),
            datum: new Date(),
            cena: req.body.cena,
            konobar: '',
            jela: req.body.jela,
            naziv_restorana: req.body.naziv_restorana,
            status: 'napravljena',
            procenjeno_vreme: '',
            ime_korisnika: req.body.ime_korisnika,
            adresa_korisnika: req.body.adresa_korisnika
        };

        new Porudzbina(porudzbina).save().then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiZaRestoran = (req: express.Request, res: express.Response) => {
        Porudzbina.find({ status: 'napravljena', restoranId: ObjectId.createFromHexString(req.body.restoranId) }).sort({ datum: -1 }).then((porudzbine) => {
            res.json(porudzbine);
        }).catch((err) => {
            console.log(err);
        });
    };

    prihvati = (req: express.Request, res: express.Response) => {
        Porudzbina.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { status: 'prihvaćena', konobar: req.body.konobar, procenjeno_vreme: req.body.procenjeno_vreme }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    odbij = (req: express.Request, res: express.Response) => {
        Porudzbina.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { status: 'odbijena' }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    dohvatiAktuelneZaGosta = (req: express.Request, res: express.Response) => {
        Porudzbina.find({ status: 'prihvaćena', korisnikId: ObjectId.createFromHexString(req.body.korisnikId) }).sort({ datum: -1 }).then((porudzbine) => {
            res.json(porudzbine);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiArhivuZaGosta = (req: express.Request, res: express.Response) => {
        Porudzbina.find({ status: 'dostavljena', korisnikId: ObjectId.createFromHexString(req.body.korisnikId) }).sort({ datum: -1 }).then((porudzbine) => {
            res.json(porudzbine);
        }).catch((err) => {
            console.log(err);
        });
    };

}