import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  kor_ime: string = ''
  lozinka: string = ''
  greske: string = ''

  prijava() {
    this.greske = '';

    this.servis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik) => {
      if (korisnik) {
        if ((korisnik.tip == 'G' && korisnik.aktivan) || korisnik.tip == 'K') {
          localStorage.setItem("ulogovan", JSON.stringify(korisnik));
          this.ruter.navigate(['profil']);
        }
        else if (korisnik.tip == 'A') {
          this.greske = 'Ne možete da se prijavite kao admin preko ove forme!';
        }
        else if (!korisnik.aktivan && korisnik.prihvacen) {
          this.greske = 'Vaš nalog nije odobren od strane admina!';
        }
        else {
          this.greske = 'Vaš nalog još nije pregledan od strane admina!'
        }
      }
      else {
        this.greske = 'Pogrešno korisničko ime ili lozinka!';
      }
    });
  }
}
