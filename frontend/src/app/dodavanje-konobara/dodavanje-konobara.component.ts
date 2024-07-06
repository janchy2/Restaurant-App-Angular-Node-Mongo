import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dodavanje-konobara',
  templateUrl: './dodavanje-konobara.component.html',
  styleUrls: ['./dodavanje-konobara.component.css']
})
export class DodavanjeKonobaraComponent implements OnInit {

  constructor(private ruter: Router, private servisK: KorisnikService, private servisR: RestoranService) { }

  kor_ime: string = ''
  lozinka: string = ''
  tip: string = ''
  pitanje: string = ''
  odgovor: string = ''
  ime: string = ''
  prezime: string = ''
  pol: string = 'M'
  adresa: string = ''
  telefon: string = ''
  mejl: string = ''
  izabran_restoran: string = ''
  greske: string = ''
  restorani: Restoran[] = []
  sadrzajSlike: string | ArrayBuffer | null = null

  ngOnInit() {
    this.servisR.dohvatiSveRestorane().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  unetaSlika(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      this.sadrzajSlike = reader.result;
      this.greske = '';

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.greske += " Pogrešan format slike (treba da bude JPG/PNG)!"
        return;
      }

      let img = new Image();
      img.src = this.sadrzajSlike as string;
      img.onload = () => {
        if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
          this.greske += " Pogrešna veličina slike (treba da bude 100x100 - 300x300 px)!";
        }
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  dohvatiFajl(file: string): Promise<Blob> {
    return fetch(file).then(response => response.blob());
  }

  dodaj() {

    this.greske = ''

    //podrazumevana slika
    if (this.sadrzajSlike == null) {
      this.dohvatiFajl("../assets/podrazumevana_profilna.jpg").then(blob => {
        let reader = new FileReader();
        reader.onload = () => {
          this.sadrzajSlike = reader.result;
          this.provereIUnos();
        };
        reader.readAsDataURL(blob);
      });
    }
    else {
      this.provereIUnos();
    }
  }


  provereIUnos() {
    this.greske = '';

    //telefon format
    let regex = /\+381\ [0-9]{9}$/
    if (!regex.test(this.telefon)) {
      this.greske += " Loš telefon!";
    }

    //mejl format
    regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(this.mejl)) {
      this.greske += " Loš i-mejl!";
    }

    //lozinka format
    regex = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z].{5,9}$/
    if (!regex.test(this.lozinka)) {
      this.greske += " Loša lozinka (treba da ima 6-10 karaktera, najmanje jedno veliko slovo, tri mala, jedan broj i specijalan karakter i mora da počinje slovom)!";
    }

    //sve uneto
    if (this.pitanje == '') {
      this.greske += " Niste uneli bezbednosno pitanje!";
    }
    if (this.odgovor == '') {
      this.greske += " Niste uneli odgovor na bezbednosno pitanje!";
    }
    if (this.ime == '') {
      this.greske += " Niste uneli ime!";
    }
    if (this.prezime == '') {
      this.greske += " Niste uneli prezime!";
    }
    if (this.adresa == '') {
      this.greske += " Niste uneli adresu!";
    }
    if (this.izabran_restoran == '') {
      this.greske += " Niste uneli restoran!";
    }
    //kor_ime i mejl jedinstven
    this.servisK.dohvatiSveKonobare().subscribe((konobari) => {
      if (konobari) {
        konobari.forEach((konobar) => {
          if (konobar.kor_ime == this.kor_ime) {
            this.greske += " Korisničko ime već postoji!";
          }
          if (konobar.mejl == this.mejl) {
            this.greske += " I-mejl adresa već postoji!";
          }
        });
      }
      this.servisK.dohvatiSveKonobare().subscribe((konobari) => {
        if (konobari) {
          konobari.forEach((konobar) => {
            if (konobar.kor_ime == this.kor_ime) {
              this.greske += " Korisničko ime već postoji!";
            }
            if (konobar.mejl == this.mejl) {
              this.greske += " I-mejl adresa već postoji!";
            }
          });
        }
        if (this.greske == '') {
          this.unos();
        }
      })
    }
    )
  }

  unos() {
    let konobar = new Korisnik();
    konobar.kor_ime = this.kor_ime;
    konobar.lozinka = this.lozinka;
    konobar.pitanje = this.pitanje;
    konobar.odgovor = this.odgovor;
    konobar.ime = this.ime;
    konobar.prezime = this.prezime;
    konobar.pol = this.pol;
    konobar.adresa = this.adresa;
    konobar.telefon = this.telefon;
    konobar.mejl = this.mejl;
    konobar.restoran = this.izabran_restoran;
    konobar.tip = 'K';
    konobar.slika = this.sadrzajSlike as string;

    this.servisK.registracijaKonobara(konobar).subscribe(() => {
      alert('Konobar dodat!');
      this.ruter.navigate(['admin/pregled']);
    })

  }
}
