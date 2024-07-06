import * as express from "express";
import Restoran from "../models/restoran";
import Rezervacija from "../models/rezervacija";
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
            radno_vreme: '',
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

    dohvatiBrojRestorana = (req: express.Request, res: express.Response) => {
        Restoran.find({}).then((restorani) => {
            res.json(restorani.length);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiRestoraneSaKonobarima = async (req: express.Request, res: express.Response) => {
        const rezultat = await Restoran.aggregate([
            {
                $lookup: {
                    from: 'korisnici',
                    localField: '_id',
                    foreignField: 'restoran',
                    as: 'konobari'
                }
            },
            {
                $project: {
                    naziv: 1,
                    adresa: 1,
                    tip: 1,
                    konobari: {
                        $filter: {
                            input: '$konobari',
                            as: 'konobar',
                            cond: { $eq: ['$$konobar.tip', 'K'] }
                        }
                    }
                }
            },
            {
                $project: {
                    naziv: 1,
                    adresa: 1,
                    tip: 1,
                    konobari: {
                        $map: {
                            input: '$konobari',
                            as: 'konobar',
                            in: { ime: '$$konobar.ime', prezime: '$$konobar.prezime' }
                        }
                    }
                }
            }
        ]);

        res.json(rezultat);
    };

    dohvatiKomentare = (req: express.Request, res: express.Response) => {
        Rezervacija.find({ restoranId: ObjectId.createFromHexString(req.body.restoranId) }).then((rezervacije) => {
            let komentari: any[] = [];
            rezervacije.forEach(rez => {
                if (rez.komentar && rez.komentar != '')
                    komentari.push({
                        komentar: rez.komentar,
                        ocena: rez.ocena
                    });
            });
            res.json(komentari);
        }).catch((err) => {
            console.log(err);
        });
    }
}
