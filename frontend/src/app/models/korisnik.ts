export class Korisnik {
    _id: string = ''
    kor_ime: string = ''
    lozinka: string = ''
    pitanje: string = ''
    odgovor: string = ''
    ime: string = ''
    prezime: string = ''
    pol: string = ''
    adresa: string = ''
    telefon: string = ''
    mejl: string = ''
    slika: ArrayBuffer | string | null = null
    broj_kartice: string = ''
    restoran: string = ''
    tip: string = ''
    prihvacen: boolean = false
    aktivan: boolean = false
}