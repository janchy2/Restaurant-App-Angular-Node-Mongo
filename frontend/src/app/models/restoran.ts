export class Restoran {
    _id: string = ''
    naziv: string = ''
    adresa: string = ''
    kontakt_osoba: string = ''
    telefon: string = ''
    mejl: string = ''
    tip: string = ''
    opis: string = ''
    raspored: any[] = []
    radno_vreme: string = ''
    dodaj_vreme: boolean = false
    prosecna_ocena: number = 0
    zbir_ocena: number = 0
    broj_ocena: number = 0
    jelovnik: Jelo[] = []
}

export class Jelo {
    naziv: string = ''
    cena: number = 0
    slika: ArrayBuffer | string | null = null
    sastojci: String[] = []
    // samo za obradu
    kolicina: number = 0
}