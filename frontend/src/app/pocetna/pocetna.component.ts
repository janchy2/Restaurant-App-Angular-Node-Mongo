import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { RestoranService } from '../services/restoran.service';
import { RezervacijaService } from '../services/rezervacija.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private ruter: Router, private servis1: KorisnikService, private servis2: RestoranService, private servis3: RezervacijaService) { }

  ngOnInit(): void {
    this.servis1.dohvatiBrojGostiju().subscribe((broj) => {
      this.broj_gostiju = broj;
      this.servis2.dohvatiBrojRestorana().subscribe((broj) => {
        this.broj_restorana = broj;
        this.servis3.dohvatiRezervacijeDan().subscribe((broj) => {
          this.rezervacije_dan = broj;
          this.servis3.dohvatiRezervacijeMesec().subscribe((broj) => {
            this.rezervacije_mesec = broj;
            this.servis3.dohvatiRezervacijeNedelja().subscribe((broj) => {
              this.rezervacije_nedelja = broj;
              this.servis2.dohvatiRestoraneSaKonobarima().subscribe((lista) => {
                this.lista = lista;
              });
            });
          });
        });
      });
    });
  }

  lista: any[] = []
  broj_restorana: number = 0
  broj_gostiju: number = 0
  rezervacije_dan: number = 0
  rezervacije_nedelja: number = 0
  rezervacije_mesec: number = 0


  prijaviSe() {
    this.ruter.navigate(['prijava'])
  }

  registrujSe() {
    this.ruter.navigate(['registracija'])
  }

}
