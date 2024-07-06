import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/korisnik';
import { RestoranService } from '../services/restoran.service';

@Component({
  selector: 'app-rezervacije-gost',
  templateUrl: './rezervacije-gost.component.html',
  styleUrls: ['./rezervacije-gost.component.css']
})
export class RezervacijeGostComponent {
  constructor(private ruter: Router, private servis1: RezervacijaService, private servis2: RestoranService) { }

  aktuelne: Rezervacija[] = []
  istekle: Rezervacija[] = []
  gost: Korisnik = new Korisnik()
  ocena: number = 1
  komentar: string = ''

  ngOnInit(): void {
    let gost = localStorage.getItem('ulogovan');
    if (gost) {
      this.gost = JSON.parse(gost);
    }
    this.servis1.dohvatiAktuelneZaGosta(this.gost._id).subscribe((aktuelne) => {
      this.aktuelne = aktuelne;
      this.aktuelne.forEach(rez => {
        rez.moze_otkazivanje = (new Date(rez.datum).getTime() - new Date().getTime() >= 45 * 60 * 1000);
      });
      this.servis1.dohvatiIstekleZaGosta(this.gost._id).subscribe((istekle) => {
        this.istekle = istekle;
      });
    });
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  otkazi(r: Rezervacija) {
    this.servis1.otkazi(r._id).subscribe(() => {
      alert('Rezervacija otkazana!');
      this.ngOnInit();
    })
  }

  oceni(r: Rezervacija) {
    r.za_ocenjivanje = true;
    this.ocena = 1;
    this.komentar = '';
  }

  postaviOcenu(zvezdica: number) {
    this.ocena = zvezdica;
  }

  posaljiOcenu(r: Rezervacija) {
    this.servis1.oceni(r._id, this.ocena, this.komentar).subscribe(() => {
      this.servis2.dohvatiPoId(r.restoranId).subscribe((restoran) => {
        this.servis2.dodajOcenu(r.restoranId, restoran.zbir_ocena + this.ocena, restoran.broj_ocena + 1).subscribe(() => {
          this.ngOnInit();
        });
      });
    });
  }
}
