import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Jela from "./jela";

const Schema = mongoose.Schema;

let Porudzbina = new Schema({
    restoranId: {
        type: ObjectId,
    },
    korisnikId: {
        type: ObjectId,
    },
    jela: [Jela],
    datum: {
        type: Date,
    },
    cena: {
        type: Number,
    },
    konobar: {
        type: String,
    },
    naziv_restorana: {
        type: String,
    },
    // moze da bude napravljena, prihvacena, odbijena, dostavljena
    status: {
        type: String,
    },
    // 20-30, 30-40, 50-60 min 
    procenjeno_vreme: {
        type: String,
    },
    ime_korisnika: {
        type: String,
    },
    adresa_korisnika: {
        type: String,
    },
});

export default mongoose.model("Porudzbina", Porudzbina, "porudzbine");