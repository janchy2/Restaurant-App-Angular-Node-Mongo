import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import gostRouter from './routers/gost.router';
import konobarRouter from './routers/konobar.router';
import korisnikRouter from './routers/korisnik.router';
import restoranRouter from './routers/restoran.router';
import rezervacijaRouter from './routers/rezervacija.router';
import porudzbinaRouter from './routers/porudzbina.router';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb' }));

mongoose.connect("mongodb://127.0.0.1:27017/projekat_baza");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});

const router = express.Router();
router.use("/gost", gostRouter);
router.use("/konobar", konobarRouter);
router.use("/korisnik", korisnikRouter);
router.use("/restoran", restoranRouter);
router.use("/rezervacija", rezervacijaRouter);
router.use("/porudzbina", porudzbinaRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));