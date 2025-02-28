import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  lozinka: string = ''
  korisnik: Korisnik = new Korisnik()
  odgovor: string = ''
  kor_ime: string = ''
  dobro_ime: boolean = false
  ulogovan: boolean = false
  greske: string = ''
  zaboravljena: boolean = false;

  ngOnInit() {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.ulogovan = true;
      this.korisnik = JSON.parse(ulogovan);
      this.kor_ime = this.korisnik.kor_ime;
    }
    else {
      this.zaboravljena = true;
    }
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  daljeZnam() {
    this.servis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik) => {
      if (korisnik) {
        localStorage.setItem('ime_za_promenu', this.kor_ime);
        this.ruter.navigate(['nova_lozinka']);
      }
      else {
        this.greske = 'Pogrešna lozinka!';
      }
    })
  }

  zaboravljenaLozinka(event: Event) {
    event.preventDefault();
    this.zaboravljena = true;
    this.greske = ''
  }

  daljeNeZnam() {
    this.greske = '';
    if (!this.dobro_ime) {
      this.servis.dohvatiPoKorImenu(this.kor_ime).subscribe((korisnik) => {
        if (korisnik && korisnik.aktivan) {
          this.korisnik = korisnik;
          this.dobro_ime = true;
        }
        else if(korisnik && !korisnik.aktivan) {
          this.greske = 'Vaš nalog još uvek nije prihvaćen ili nije aktivan!';
        }
        else {
          this.greske = 'Korisničko ime ne postoji!';
        }
      });
    }
    else {
      if (this.odgovor == this.korisnik.odgovor) {
        localStorage.setItem('ime_za_promenu', this.kor_ime);
        this.ruter.navigate(['nova_lozinka']);
      }
      else {
        this.greske = 'Pogrešan odgovor!';
      }
    }

  }
}
