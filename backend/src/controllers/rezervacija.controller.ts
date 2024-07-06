import * as express from "express";
import Restoran from "../models/restoran";
import Rezervacija from "../models/rezervacija";
import { ObjectId } from "mongodb";

export class RezervacijaController {

    dostupnostStolova = async (req: express.Request, res: express.Response) => {
        const restoranId = req.body.restoranId;
        const datum = req.body.datum;
        const vreme = req.body.vreme;

        const datum_vreme = new Date(datum);
        const [sati, minuti] = vreme.split(':').map(Number);
        datum_vreme.setHours(sati, minuti, 0, 0);


        // rezervacije koje se mozda preklapaju sa datom
        const preklapajuSe = await Rezervacija.find({
            restoranId: ObjectId.createFromHexString(req.body.restoranId),
            datum: {
                $gte: new Date(datum_vreme.getTime() - 4 * 60 * 60 * 1000), // ovde se gleda 4 sata (maks, ako je produzena)
                $lte: new Date(datum_vreme.getTime() + 4 * 60 * 60 * 1000)
            }
        });
        const restoran = await Restoran.findById(restoranId);
        if (!restoran) return;

        const raspored = restoran.raspored;

        const dostupnost = raspored.filter((sto: any) => sto.tip === 'sto').map((sto: any) => {
            const rezervisan = preklapajuSe.some((rezervacija: any) => {
                const pocetak = new Date(rezervacija.datum).getTime();
                const razlika = rezervacija.produzena ? 4 * 60 * 60 * 1000 : 3 * 60 * 60 * 1000;

                return rezervacija.x_stola === sto.x && rezervacija.y_stola === sto.y &&
                    (datum_vreme.getTime() - razlika < pocetak && pocetak < datum_vreme.getTime() + 3 * 60 * 60 * 1000) &&
                    rezervacija.prihvacena &&
                    !(rezervacija.istekla && !rezervacija.ispunjena);
            });

            return {
                x: sto.x,
                y: sto.y,
                mesta: sto.mesta,
                rezervisan: rezervisan
            };
        });

        res.json(dostupnost);
    }

    dodajRezervaciju = (req: express.Request, res: express.Response) => {
        // treba da se spoje datum i vreme
        const datum_vreme = new Date(req.body.datum);
        const [sati, minuti] = req.body.vreme.split(':').map(Number);
        datum_vreme.setHours(sati, minuti, 0, 0);

        let rezervacija = {
            korisnikId: ObjectId.createFromHexString(req.body.korisnikId),
            restoranId: ObjectId.createFromHexString(req.body.restoranId),
            datum: datum_vreme,
            vreme: req.body.vreme,
            formatiran_datum: req.body.datum,
            x_stola: req.body.x_stola,
            y_stola: req.body.y_stola,
            mesta: req.body.mesta,
            zahtevi: req.body.zahtevi,
            obradjena: false,
            komentar: '',
            ocena: 0,
            prihvacena: false,
            ispunjena: false,
            istekla: false,
            produzena: false,
            konobar: '',
            otkazana: false,
            razlog: '',
            ime_gosta: req.body.ime_gosta,
            naziv_restorana: req.body.naziv_restorana,
            adresa_restorana: req.body.adresa_restorana
        };

        new Rezervacija(rezervacija).save().then(() => {
            res.json("ok");
        }).catch((err) => {
            console.log(err);
        });

    };

    dohvatiNeobradjene = (req: express.Request, res: express.Response) => {
        Rezervacija.find({ obradjena: false, restoranId: ObjectId.createFromHexString(req.body.restoranId) }).sort({ datum: 1 }).then((rezervacije) => {
            res.json(rezervacije);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiZaKonobara = (req: express.Request, res: express.Response) => {
        Rezervacija.find({ konobar: req.body.konobar, prihvacena: true, otkazana: false }).then((rezervacije) => {
            res.json(rezervacije);
        }).catch((err) => {
            console.log(err);
        });
    };

    prihvatiForma = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { x_stola: req.body.x, y_stola: req.body.y, obradjena: true, prihvacena: true, konobar: req.body.konobar }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    prihvatiPanel = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { obradjena: true, prihvacena: true, konobar: req.body.konobar }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    odbij = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { obradjena: true, razlog: req.body.razlog }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    potvrdiDolazak = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { istekla: true, ispunjena: true }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    potvrdiNedolazak = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { istekla: true }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    produzi = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { produzena: true }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    }

    moguceProduzenje = (req: express.Request, res: express.Response) => {
        let datum_vreme = new Date(req.body.datum);
        Rezervacija.find({
            restoranId: ObjectId.createFromHexString(req.body.restoranId),
            datum: {
                $gte: new Date(datum_vreme.getTime() + 3 * 60 * 60 * 1000), // ako postoji rezervacija koja pocinje u sat vremena produzenja
                $lt: new Date(datum_vreme.getTime() + 4 * 60 * 60 * 1000)
            },
            prihvacena: true
        }).then((rezervacije) => {
            res.json(rezervacije.length == 0);
        }).catch((err) => {
            console.log(err);
        });
    };

    brojNeispunjenihZaGosta = (req: express.Request, res: express.Response) => {
        Rezervacija.find({
            korisnikId: ObjectId.createFromHexString(req.body.korisnikId),
            istekla: true,
            ispunjena: false
        }).then((rezervacije) => {
            res.json(rezervacije.length);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiAktuelneZaGosta = (req: express.Request, res: express.Response) => {
        Rezervacija.find({ korisnikId: ObjectId.createFromHexString(req.body.korisnikId), prihvacena: true, istekla: false, otkazana: false })
            .sort({ datum: -1 }).then((rezervacije) => {
                res.json(rezervacije);
            }).catch((err) => {
                console.log(err);
            });
    };

    dohvatiIstekleZaGosta = (req: express.Request, res: express.Response) => {
        Rezervacija.find({ korisnikId: ObjectId.createFromHexString(req.body.korisnikId), prihvacena: true, istekla: true, otkazana: false })
            .sort({ datum: -1 }).then((rezervacije) => {
                res.json(rezervacije);
            }).catch((err) => {
                console.log(err);
            });
    };

    otkazi = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { otkazana: true }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    oceni = (req: express.Request, res: express.Response) => {
        Rezervacija.findOneAndUpdate({ _id: ObjectId.createFromHexString(req.body.id) },
            { ocena: req.body.ocena, komentar: req.body.komentar }).then(() => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
    };

    statistika1 = async (req: express.Request, res: express.Response) => {
        const rezervacije = await Rezervacija.find({ konobar: req.body.konobar, ispunjena: true });

        const mapa: { [key: string]: number } = {};

        rezervacije.forEach(rez => {
            if (rez.datum) {
                const datum = rez.datum.toISOString().split('T')[0];
                if (!mapa[datum]) {
                    mapa[datum] = 0;
                }
                if (rez.mesta)
                    mapa[datum] += rez.mesta;
            }
        });

        const rezultat = Object.keys(mapa).map(datum => ({
            datum: datum,
            broj_gostiju: mapa[datum]
        }));

        res.json(rezultat);
    };

    statistika2 = async (req: express.Request, res: express.Response) => {
        const rezervacije = await Rezervacija.find({ restoranId: ObjectId.createFromHexString(req.body.restoranId), ispunjena: true });

        const mapa: { [key: string]: number } = {};

        rezervacije.forEach(rez => {
            if (rez.konobar) {
                if (!mapa[rez.konobar]) {
                    mapa[rez.konobar] = 0;
                }
                if (rez.mesta)
                    mapa[rez.konobar] += rez.mesta;
            }
        });

        const rezultat = Object.keys(mapa).map(konobar => ({
            konobar: konobar,
            broj_gostiju: mapa[konobar]
        }));

        res.json(rezultat);
    };

    statistika3 = async (req: express.Request, res: express.Response) => {
        const pocetni_datum = new Date();
        pocetni_datum.setMonth(pocetni_datum.getMonth() - 24);

        const rezervacije = await Rezervacija.find({
            datum: { $gte: pocetni_datum, $lte: new Date() }
        });

        const mapa: { [key: string]: number } = {};

        rezervacije.forEach(rez => {
            if (rez.datum) {
                const datum = rez.datum.toISOString().split('T')[0];
                if (!mapa[datum]) {
                    mapa[datum] = 0;
                }
                mapa[datum]++;
            }
        });

        const broj_rezervacija = [0, 0, 0, 0, 0, 0, 0];
        const broj_pojava_dana = [0, 0, 0, 0, 0, 0, 0];

        Object.keys(mapa).forEach(datum => {
            const dan = new Date(datum).getDay();

            broj_rezervacija[dan] = mapa[datum];
            broj_pojava_dana[dan]++;
        })

        const dani = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
        const prosek = dani.map((dan, indeks) => {
            return broj_rezervacija[indeks] / broj_pojava_dana[indeks];
        });

        const rezultat = dani.map((dan, indeks) => ({
            dan: dan,
            prosek: prosek[indeks]
        }));

        res.json(rezultat);
    };

    dohvatiRezervacijeDan = (req: express.Request, res: express.Response) => {
        let pocetni_datum = new Date();
        pocetni_datum = new Date(pocetni_datum.getTime() - 24 * 60 * 60 * 1000);
        Rezervacija.find({
            prihvacena: true,
            otkazana: false,
            datum: { $gte: pocetni_datum, $lte: new Date() }
        }).then((rezervacije) => {
            res.json(rezervacije.length);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiRezervacijeNedelja = (req: express.Request, res: express.Response) => {
        let pocetni_datum = new Date();
        pocetni_datum = new Date(pocetni_datum.getTime() - 7 * 24 * 60 * 60 * 1000);
        Rezervacija.find({
            prihvacena: true,
            otkazana: false,
            datum: { $gte: pocetni_datum, $lte: new Date() }
        }).then((rezervacije) => {
            res.json(rezervacije.length);
        }).catch((err) => {
            console.log(err);
        });
    };

    dohvatiRezervacijeMesec = (req: express.Request, res: express.Response) => {
        let pocetni_datum = new Date();
        pocetni_datum.setMonth(pocetni_datum.getMonth() - 1);
        Rezervacija.find({
            prihvacena: true,
            otkazana: false,
            datum: { $gte: pocetni_datum, $lte: new Date() }
        }).then((rezervacije) => {
            res.json(rezervacije.length);
        }).catch((err) => {
            console.log(err);
        });
    };
}