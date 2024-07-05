export class Rezervacija {
    _id: string = ''
    korisnikId: string = ''
    restoranId: string = ''
    datum: string = ''
    vreme: string = ''
    x_stola: number = 0
    y_stola: number = 0
    mesta: number = 0
    zahtevi: string = ''
    obradjena: boolean = false
    komentar: string = ''
    ocena: number = 0
    prihvacena: boolean = false
    ispunjena: boolean = false
    istekla: boolean = false
    produzena: boolean = false
    otkazana: boolean = false
    konobar: string = ''
    razlog: string = ''
    formatiran_datum: string = ''
    ime_gosta: string = ''
    pola_sata: boolean = false
    naziv_restorana: string = ''
    adresa_restorana: string = ''
    moze_otkazivanje: boolean = false
    za_ocenjivanje: boolean = false
}