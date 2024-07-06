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
                this.pretrazena_lista = lista;
              });
            });
          });
        });
      });
    });
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  lista: any[] = []
  pretrazena_lista: any[] = []
  broj_restorana: number = 0
  broj_gostiju: number = 0
  rezervacije_dan: number = 0
  rezervacije_nedelja: number = 0
  rezervacije_mesec: number = 0
  sortiranje_po: string = 'naziv'
  nacin: string = 'neopadajuce'
  naziv: string = ''
  adresa: string = ''
  tip: string = ''

  sortiraj() {
    this.pretrazena_lista.sort((r1: any, r2: any) => {
      if (this.sortiranje_po == 'naziv') {
        if (this.nacin == 'neopadajuce') {
          if (r1.naziv < r2.naziv) return -1;
          if (r1.naziv > r2.naziv) return 1;
          return 0;
        }
        else {
          if (r1.naziv < r2.naziv) return 1;
          if (r1.naziv > r2.naziv) return -1;
          return 0;
        }
      }
      if (this.sortiranje_po == 'tip') {
        if (this.nacin == 'neopadajuce') {
          if (r1.tip < r2.tip) return -1;
          if (r1.tip > r2.tip) return 1;
          return 0;
        }
        else {
          if (r1.tip < r2.tip) return 1;
          if (r1.tip > r2.tip) return -1;
          return 0;
        }
      }
      if (this.sortiranje_po == 'adresa') {
        if (this.nacin == 'neopadajuce') {
          if (r1.adresa < r2.adresa) return -1;
          if (r1.adresa > r2.adresa) return 1;
          return 0;
        }
        else {
          if (r1.adresa < r2.adresa) return 1;
          if (r1.adresa > r2.adresa) return -1;
          return 0;
        }
      }
      return 0;
    })
  }

  pretrazi() {
    this.pretrazena_lista = this.lista.filter(restoran => {
      let slican_naziv = true;
      if (this.naziv) slican_naziv = restoran.naziv.toLowerCase().includes(this.naziv.toLowerCase());
      let slican_tip = true;
      if (this.tip) slican_tip = restoran.tip.toLowerCase().includes(this.tip.toLowerCase());
      let slicna_adresa = true;
      if (this.adresa) slicna_adresa = restoran.adresa.toLowerCase().includes(this.adresa.toLowerCase());
      return slican_naziv && slican_tip && slicna_adresa;
    });
  }
}
