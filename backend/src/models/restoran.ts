import mongoose from "mongoose";
import Jelo from "./jelo";

const Schema = mongoose.Schema;

let Restoran = new Schema({
  naziv: {
    type: String,
  },
  tip: {
    type: String,
  },
  adresa: {
    type: String,
  },
  opis: {
    type: String,
  },
  kontakt_osoba: {
    type: String,
  },
  telefon: {
    type: String,
  },
  mejl: {
    type: String,
  },
  raspored: {
    type: Schema.Types.Mixed,
  },
  radno_vreme: {
    type: String,
  },
  zbir_ocena: {
    type: Number,
  },
  broj_ocena: {
    type: Number,
  },
  jelovnik: [Jelo],
});

export default mongoose.model("Restoran", Restoran, "restorani");