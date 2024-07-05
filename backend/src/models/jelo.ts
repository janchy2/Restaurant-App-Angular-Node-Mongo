import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Jelo = new Schema({
    naziv: {
        type: String,
    },
    cena: {
        type: Number,
    },
    sastojci: [String],
    slika: {
        type: String
    },
});

export default Jelo;