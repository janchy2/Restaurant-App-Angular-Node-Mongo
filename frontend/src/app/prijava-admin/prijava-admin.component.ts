import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css']
})
export class PrijavaAdminComponent {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  kor_ime: string = ''
  lozinka: string = ''
  greske: string = ''

  prijava() {
    this.greske = '';

    this.servis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik) => {
      if (korisnik) {
        localStorage.setItem("ulogovan", JSON.stringify(korisnik));
        if (korisnik.tip == 'A') {
          this.ruter.navigate(['admin/pregled']);
        }
        else {
          this.greske = 'Preko ove forme ne možete da se ulogujete ako niste admin!'
        }
      }
      else {
        this.greske = 'Pogrešno korisničko ime ili lozinka!';
      }
    });
  }
}
