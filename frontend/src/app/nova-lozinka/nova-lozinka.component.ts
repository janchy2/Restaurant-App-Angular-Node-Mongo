import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-nova-lozinka',
  templateUrl: './nova-lozinka.component.html',
  styleUrls: ['./nova-lozinka.component.css']
})
export class NovaLozinkaComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  lozinka1: string = ''
  lozinka2: string = ''
  greske: string = ''

  promeniLozinku() {
    this.greske = '';
    let regex = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z].{5,9}$/
    if (this.lozinka1 != this.lozinka2) {
      this.greske = 'Unete lozinke se ne poklapaju!'
    }
    else if (!regex.test(this.lozinka1)) {
      this.greske = " Loša lozinka (treba da ima 6-10 karaktera, najmanje jedno veliko slovo, tri mala, jedan broj i specijalan karakter i mora da počinje slovom)!";
    }
    else {
      let kor_ime = localStorage.getItem('ime_za_promenu');
      if (kor_ime) {
        this.servis.promenaLozinke(kor_ime, this.lozinka1).subscribe(() => {
          localStorage.removeItem('ime_za_promenu');
          localStorage.removeItem('ulogovan');
          if (kor_ime) {
            this.servis.dohvatiPoKorImenu(kor_ime).subscribe((korisnik) => {
              if (korisnik.tip == 'A') {
                this.ruter.navigate(['admin']);
              }
              else {
                this.ruter.navigate(['prijava']);
              }
            });
          }
        });
      }

    }
  }
}
