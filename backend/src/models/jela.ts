import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Jela = new Schema({
    naziv: {
        type: String,
    },
    // jedinicna cena
    cena: {
        type: Number,
    },
    kolicina: {
        type: Number,
    }
});

export default Jela;