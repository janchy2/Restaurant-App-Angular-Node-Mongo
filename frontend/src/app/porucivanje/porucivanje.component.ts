import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Jelo, Restoran } from '../models/restoran';
import { Korisnik } from '../models/korisnik';
import { Jela, Porudzbina } from '../models/porudzbina';

@Component({
  selector: 'app-porucivanje',
  templateUrl: './porucivanje.component.html',
  styleUrls: ['./porucivanje.component.css']
})
export class PorucivanjeComponent implements OnInit {

  constructor(private ruter: Router, private servis: PorudzbinaService) { }

  restoran: Restoran = new Restoran()
  korisnik: Korisnik = new Korisnik()
  porudzbina: Porudzbina = new Porudzbina()
  pregled: boolean = false

  ngOnInit(): void {
    let restoran = localStorage.getItem('za_pregled');
    if (restoran) {
      this.restoran = JSON.parse(restoran);
    }
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik) {
      this.korisnik = JSON.parse(korisnik);
    }
  }

  dodajUKorpu(j: Jelo) {
    if (!j.kolicina || j.kolicina <= 0) {
      alert('Niste uneli dobru količinu!');
      return;
    }
    let dodato = false;
    this.porudzbina.jela.forEach(jelo => {
      if (jelo.naziv == j.naziv) {
        alert('Već ste dodali to jelo!');
        dodato = true;
        return;
      }
    });
    if (dodato) return;
    this.porudzbina.jela.push({
      naziv: j.naziv,
      cena: j.cena,
      kolicina: j.kolicina,
      ukupno: j.kolicina * j.cena
    });
    alert('Dodato u korpu!');
  }

  pregledKorpe() {
    this.pregled = true;
  }

  uvecaj(j: Jela) {
    j.kolicina += 1;
    j.ukupno = j.kolicina * j.cena;
  }

  smanji(j: Jela) {
    j.kolicina -= 1;
    if (j.kolicina == 0) {
      this.ukloni(j);
      return;
    }
    j.ukupno = j.kolicina * j.cena;
  }

  ukloni(j: Jela) {
    this.porudzbina.jela = this.porudzbina.jela.filter(jelo => jelo.naziv !== j.naziv);
  }

  zavrsi() {
    if (this.porudzbina.jela.length == 0) {
      alert("Korpa je prazna!");
      return;
    }
    this.porudzbina.restoranId = this.restoran._id;
    this.porudzbina.korisnikId = this.korisnik._id;
    this.porudzbina.ime_korisnika = this.korisnik.kor_ime;
    this.porudzbina.adresa_korisnika = this.korisnik.adresa;
    this.porudzbina.jela.forEach(jelo => {
      this.porudzbina.cena += jelo.ukupno;
    });
    this.porudzbina.naziv_restorana = this.restoran.naziv;
    this.servis.dodajPorudzbinu(this.porudzbina).subscribe(() => {
      alert('Porudžbina poslata!');
      this.ruter.navigate(['restorani_gost']);
    })
  }

  zatvoriPregled() {
    this.pregled = false;
  }
}
