import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Korisnik } from '../models/korisnik';
import { Porudzbina } from '../models/porudzbina';

@Component({
  selector: 'app-porudzbine-konobar',
  templateUrl: './porudzbine-konobar.component.html',
  styleUrls: ['./porudzbine-konobar.component.css']
})
export class PorudzbineKonobarComponent implements OnInit {

  constructor(private ruter: Router, private servis: PorudzbinaService) { }

  konobar: Korisnik = new Korisnik()
  porudzbine: Porudzbina[] = []

  ngOnInit(): void {
    let konobar = localStorage.getItem('ulogovan');
    if (konobar) {
      this.konobar = JSON.parse(konobar);
    }
    this.servis.dohvatiZaRestoran(this.konobar.restoran).subscribe((porudzbine) => {
      this.porudzbine = porudzbine;
      this.porudzbine.forEach(porudzbina => {
        porudzbina.datum_formatiran = this.formatirajDatum(new Date(porudzbina.datum));
      });
    })
  }

  formatirajDatum(datum: Date): string {
    const yyyy = datum.getFullYear().toString();
    const mm = (datum.getMonth() + 1).toString().padStart(2, '0');
    const dd = datum.getDate().toString().padStart(2, '0');
    const hh = datum.getHours().toString().padStart(2, '0');
    const min = datum.getMinutes().toString().padStart(2, '0');

    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  prihvati(p: Porudzbina) {
    p.za_prihvatanje = true;
  }

  odbij(p: Porudzbina) {
    this.servis.odbij(p._id).subscribe(() => {
      alert('Porudžbina odbijena!');
      this.ngOnInit();
    })
  }

  potvrdi(p: Porudzbina) {
    if (p.procenjeno_vreme == '') {
      alert('Niste uneli procenjeno vreme!');
      return;
    }
    this.servis.prihvati(p._id, this.konobar.kor_ime, p.procenjeno_vreme).subscribe(() => {
      alert('Porudžbina prihvaćena!');
      this.ngOnInit();
    })
  }
}
