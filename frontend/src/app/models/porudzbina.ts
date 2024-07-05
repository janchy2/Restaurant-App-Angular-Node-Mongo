export class Porudzbina {
    _id: string = ''
    restoranId: string = ''
    korisnikId: string = ''
    jela: Jela[] = []
    datum: string = ''
    cena: number = 0
    konobar: string = ''
    naziv_restorana: string = ''
    status: string = ''
    procenjeno_vreme: string = ''
    ime_korisnika: string = ''
    adresa_korisnika: string = ''
    datum_formatiran: string = ''
    za_prihvatanje: boolean = false
}

export class Jela {
    naziv: string = ''
    cena: number = 0
    kolicina: number = 0
    // samo za obradu
    ukupno: number = 0
}