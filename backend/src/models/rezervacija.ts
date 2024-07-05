import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    korisnikId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik'
    },
    restoranId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restoran'
    },
    datum: {
        type: Date
    },
    vreme: {
        type: String
    },
    x_stola: {
        type: Number
    },
    y_stola: {
        type: Number
    },
    mesta: {
        type: Number
    },
    obradjena: {
        type: Boolean
    },
    zahtevi: {
        type: String
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    },
    prihvacena: {
        type: Boolean
    },
    ispunjena: {
        type: Boolean
    },
    istekla: {
        type: Boolean
    },
    produzena: {
        type: Boolean
    },
    konobar: {
        type: String
    },
    otkazana: {
        type: Boolean
    },
    razlog: {
        type: String
    },
    formatiran_datum: {
        type: String
    },
    ime_gosta: {
        type: String
    },
    naziv_restorana: {
        type: String
    },
    adresa_restorana: {
        type: String
    }

});

export default mongoose.model("Rezervacija", Rezervacija, "rezervacije");