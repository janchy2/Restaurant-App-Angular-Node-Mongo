import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
  ime: {
    type: String,
  },
  prezime: {
    type: String,
  },
  kor_ime: {
    type: String,
  },
  lozinka: {
    type: String,
  },
  mejl: {
    type: String,
  },
  pitanje: {
    type: String,
  },
  odgovor: {
    type: String,
  },
  pol: {
    type: String,
  },
  adresa: {
    type: String,
  },
  telefon: {
    type: String,
  },
  // samo K i G
  slika: {
    type: String,
  },
  // samo G
  broj_kartice: {
    type: String,
  },
  // samo G
  prihvacen: {
    type: Boolean,
  },
  // samo G
  aktivan: {
    type: Boolean,
  },
  // A, K, G - u zavisnosti od toga su neka polja null
  tip: {
    type: String,
  },
  // samo K
  restoran: {
    type: Schema.Types.ObjectId,
    ref: 'Restoran'
  },
});

export default mongoose.model("Korisnik", Korisnik, "korisnici");