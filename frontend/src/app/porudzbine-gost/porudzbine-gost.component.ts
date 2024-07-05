import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Korisnik } from '../models/korisnik';
import { Porudzbina } from '../models/porudzbina';

@Component({
  selector: 'app-porudzbine-gost',
  templateUrl: './porudzbine-gost.component.html',
  styleUrls: ['./porudzbine-gost.component.css']
})
export class PorudzbineGostComponent implements OnInit {
  constructor(private ruter: Router, private servis: PorudzbinaService) { }

  ngOnInit(): void {
    let gost = localStorage.getItem('ulogovan');
    if (gost) {
      this.gost = JSON.parse(gost);
    }
    this.servis.dohvatiAktuelneZaGosta(this.gost._id).subscribe((aktuelne) => {
      this.aktuelne = aktuelne;
      this.servis.dohvatiArhivuZaGosta(this.gost._id).subscribe((arhiva) => {
        this.arhiva = arhiva;
        this.arhiva.forEach(porudzbina => {
          porudzbina.datum_formatiran = this.formatirajDatum(new Date(porudzbina.datum));
        });
      })
    })
  }

  gost: Korisnik = new Korisnik()
  aktuelne: Porudzbina[] = []
  arhiva: Porudzbina[] = []


  formatirajDatum(datum: Date): string {
    const yyyy = datum.getFullYear().toString();
    const mm = (datum.getMonth() + 1).toString().padStart(2, '0');
    const dd = datum.getDate().toString().padStart(2, '0');
    const hh = datum.getHours().toString().padStart(2, '0');
    const min = datum.getMinutes().toString().padStart(2, '0');

    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }
}
