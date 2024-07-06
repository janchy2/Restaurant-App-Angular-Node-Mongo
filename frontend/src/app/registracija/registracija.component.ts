import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }


  sadrzajSlike: string | ArrayBuffer | null = null
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
  broj_kartice: string = ''
  greske: string = ''

  prijaviSe(event: Event) {
    event.preventDefault();
    this.ruter.navigate(['prijava']);
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

  registracija() {

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

    // broj kartice format
    let skracen_broj_kartice = this.broj_kartice.replace(/\D/g, '');
    regex = /^\d{13,19}$/;
    if (!regex.test(skracen_broj_kartice)) {
      this.greske += " Loš broj kreditne kartice!";
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
    //kor_ime i mejl jedinstven
    this.servis.dohvatiSveGoste().subscribe((gosti) => {
      if (gosti) {
        gosti.forEach((gost) => {
          if (gost.kor_ime == this.kor_ime) {
            this.greske += " Korisničko ime već postoji!";
          }
          if (gost.mejl == this.mejl) {
            this.greske += " I-mejl adresa već postoji!";
          }
        });
      }
      this.servis.dohvatiSveKonobare().subscribe((konobari) => {
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
    let gost = new Korisnik();
    gost.kor_ime = this.kor_ime;
    gost.lozinka = this.lozinka;
    gost.pitanje = this.pitanje;
    gost.odgovor = this.odgovor;
    gost.ime = this.ime;
    gost.prezime = this.prezime;
    gost.pol = this.pol;
    gost.adresa = this.adresa;
    gost.telefon = this.telefon;
    gost.mejl = this.mejl;
    gost.slika = this.sadrzajSlike as string;
    gost.broj_kartice = this.broj_kartice;
    gost.tip = 'G';

    this.servis.registracijaGosta(gost).subscribe(() => {
      alert('Zahtev za registraciju poslat!');
      this.ruter.navigate(['']);
    })

  }
}
