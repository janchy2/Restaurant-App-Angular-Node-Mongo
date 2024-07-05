import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  korisnik: Korisnik = new Korisnik()

  ngOnInit() {
    this.za_azuriranje = '';
    this.za_azuriranje_poruka = '';
    this.greske = '';
    this.novo = '';
    this.admin_pregled = false;
    // zavisi da li admin poziva ili korisnik za svoj profil
    let korisnik = localStorage.getItem('ulogovan');
    let tip = ''
    if (korisnik) {
      tip = JSON.parse(korisnik).tip;
    }
    if (tip == 'A') {
      korisnik = localStorage.getItem('za_pregled');
      if (korisnik) {
        this.admin_pregled = true;
        this.korisnik = JSON.parse(korisnik);
      }
    }
    else {
      if (korisnik) {
        this.korisnik = JSON.parse(korisnik);
      }
    }
  }

  za_azuriranje: string = ''
  za_azuriranje_poruka: string = ''
  greske: string = ''
  novo: string = ''
  sadrzajSlike: string | ArrayBuffer | null = null
  admin_pregled: boolean = false;

  azuriraj(polje: string) {
    this.za_azuriranje_poruka = '';
    this.greske = '';
    if (polje == 'ime') {
      this.za_azuriranje_poruka = 'novo ime';
    }
    else if (polje == 'prezime') {
      this.za_azuriranje_poruka = 'novo prezime';
    }
    else if (polje == 'adresa') {
      this.za_azuriranje_poruka = 'novu adresu';
    }
    else if (polje == 'telefon') {
      this.za_azuriranje_poruka = 'novi telefon';
    }
    else if (polje == 'mejl') {
      this.za_azuriranje_poruka = 'novi mejl';
    }
    else if (polje == 'broj_kartice') {
      this.za_azuriranje_poruka = 'novi broj kartice';
    }
    this.za_azuriranje = polje;
  }

  sacuvaj() {
    this.greske = '';
    if (this.za_azuriranje == 'telefon') {
      let regex = /\+381\ [0-9]{9}$/
      if (!regex.test(this.novo)) {
        this.greske = " Loš telefon!";
      }
    }


    else if (this.za_azuriranje == 'mejl') {
      let regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!regex.test(this.novo)) {
        this.greske = " Loš i-mejl!";
      }

    }

    else if (this.za_azuriranje == 'broj_kartice') {
      let skracen_broj_kartice = this.novo.replace(/\D/g, '');
      let regex = /^\d{13,19}$/;
      if (!regex.test(skracen_broj_kartice)) {
        this.greske = " Loš broj kreditne kartice!";
      }
    }

    else if (this.novo == '') {
      this.greske = 'Niste uneli novi podatak!';
    }

    if (this.greske == '') {
      this.servis.azurirajPodatak(this.korisnik.kor_ime, this.za_azuriranje, this.novo).subscribe(() => {
        this.servis.dohvatiPoKorImenu(this.korisnik.kor_ime).subscribe((korisnik) => {
          if (this.admin_pregled) localStorage.setItem('za_pregled', JSON.stringify(korisnik));
          else localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          this.ngOnInit();
        });
      });
    }
  }

  azurirajProfilnu() {
    this.za_azuriranje = 'slika';
    this.za_azuriranje_poruka = '';
    this.greske = '';
  }

  unetaSlika(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      this.sadrzajSlike = reader.result;
      this.greske = '';

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.greske = " Pogrešan format slike (treba da bude JPG/PNG)!"
        return;
      }

      let img = new Image();
      img.src = this.sadrzajSlike as string;
      img.onload = () => {
        if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
          this.greske = " Pogrešna veličina slike (treba da bude 100x100 - 300x300 px)!";
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

  sacuvajSliku() {
    if (this.sadrzajSlike == null) {
      this.greske = 'Niste uneli sliku!';
    }
    else {
      this.servis.azurirajSliku(this.korisnik.kor_ime, this.sadrzajSlike).subscribe(() => {
        this.servis.dohvatiPoKorImenu(this.korisnik.kor_ime).subscribe((korisnik) => {
          localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          this.ngOnInit();
        });
      })
    }
  }

  ukloniSliku() {
    this.dohvatiFajl("../assets/podrazumevana_profilna.jpg").then(blob => {
      let reader = new FileReader();
      reader.onload = () => {
        this.sadrzajSlike = reader.result;
        this.servis.azurirajSliku(this.korisnik.kor_ime, this.sadrzajSlike).subscribe(() => {
          this.servis.dohvatiPoKorImenu(this.korisnik.kor_ime).subscribe((korisnik) => {
            localStorage.setItem('ulogovan', JSON.stringify(korisnik));
            this.ngOnInit();
          });
        })
      };
      reader.readAsDataURL(blob);
    });
  }
}
