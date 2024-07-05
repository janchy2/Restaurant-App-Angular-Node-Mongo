import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from '../models/restoran';
import * as L from 'leaflet';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { RestoranService } from '../services/restoran.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.css']
})
export class RestoranComponent implements OnInit {

  constructor(private ruter: Router, private servis1: RestoranService, private servis2: RezervacijaService) { }

  restoran: Restoran = new Restoran()
  rezervacija: Rezervacija = new Rezervacija()
  greske: string = ''
  lat: number = 0
  lon: number = 0
  nacin_rezervacije: string = ''
  korisnik: Korisnik = new Korisnik()


  ngOnInit(): void {
    let restoran = localStorage.getItem('za_pregled');
    if (restoran) {
      this.restoran = JSON.parse(restoran);
    }
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik) {
      this.korisnik = JSON.parse(korisnik);
    }
    this.rezervacija.korisnikId = this.korisnik._id;
    this.rezervacija.restoranId = this.restoran._id;
    this.rezervacija.ime_gosta = this.korisnik.kor_ime;
    this.rezervacija.naziv_restorana = this.restoran.naziv;
    this.rezervacija.adresa_restorana = this.restoran.adresa;
    this.centrirajAdresu(this.restoran.adresa);
  }


  centrirajAdresu(adresa: string): void {
    this.servis1.dohvatiKoordinate(adresa).subscribe((koord: any) => {
      if (koord.length > 0) {
        this.lat = parseFloat(koord[0].lat);
        this.lon = parseFloat(koord[0].lon);
        this.inicijalizujMapu(this.lat, this.lon);
      } else {
        this.greske = 'Greška pri učitavanju adrese na mapi!';
      }
    });
  }


  inicijalizujMapu(lat: number, lon: number): void {
    const map = L.map('map').setView([lat, lon], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }).addTo(map);
  }

  rezervisiForma() {
    this.nacin_rezervacije = 'forma';
  }

  rezervisiPanel() {
    this.nacin_rezervacije = 'panel';
  }

  danUBroj(dan: string): number {
    switch (dan) {
      case 'Ponedeljak': return 1;
      case 'Utorak': return 2;
      case 'Sreda': return 3;
      case 'Četvrtak': return 4;
      case 'Petak': return 5;
      case 'Subota': return 6;
      case 'Nedelja': return 0;
      default: return -1;
    }
  }

  proveriDatum() {
    const trenutnoVreme = new Date();
    const unetoVreme = new Date(`${this.rezervacija.datum}T${this.rezervacija.vreme}`);

    if (unetoVreme < trenutnoVreme) {
      this.greske += 'Ne možete da rezervišete za datum i vreme koji su prošli!';
      return false;
    }

    const danUNedelji = unetoVreme.getDay(); // vraca broj dana

    const za_dan = this.restoran.radno_vreme.split(', ').find(deo => {
      const dan = deo.split(': ')[0];
      return this.danUBroj(dan) === danUNedelji;
    });

    if (!za_dan) return false;

    const radnoVreme = za_dan.split(': ')[1];

    if (radnoVreme === 'zatvoren') {
      this.greske += 'Restoran je zatvoren tog dana!';
      return false;
    }

    const vremena = radnoVreme.split('-');
    const otvara = new Date(`${this.rezervacija.datum}T${vremena[0]}`);
    const zatvara = new Date(`${this.rezervacija.datum}T${vremena[1]}`);

    if (unetoVreme < otvara || unetoVreme > new Date(zatvara.getTime() - 3 * 60 * 60 * 1000)) {
      this.greske += 'Restoran nije otvoren u izabrano vreme ili vaš termin mora početi najmanje tri sata pre zatvaranja!';
      return false;
    }

    return true;
  }

  zahtevForma() {
    this.greske = '';
    if (this.rezervacija.mesta == 0 || this.rezervacija.datum == '' || this.rezervacija.vreme == '') {
      this.greske = "Niste uneli sve neophodne podatke!";
      return;
    }
    if (!this.proveriDatum()) return;
    this.servis2.dostupnostStolova(this.restoran._id, this.rezervacija.datum, this.rezervacija.vreme).subscribe((stolovi) => {

      for (let i = 0; i < stolovi.length; i++) {
        const sto = stolovi[i];
        if (sto.mesta >= this.rezervacija.mesta && !sto.rezervisan) {
          this.servis2.dodajRezervaciju(this.rezervacija).subscribe(() => {
            alert('Zahtev za rezervaciju poslat!');
            localStorage.removeItem('za_pregled');
            this.ruter.navigate(['rezervacije-gost']);
          });
          break;
        }
        if (i == stolovi.length - 1) {
          this.greske = 'Nema slobodnih stolova za dati broj osoba u traženo vreme!';
        }
      }
    });
  }

  izabranDatum() {
    this.greske = '';
    if (this.rezervacija.datum == '' || this.rezervacija.vreme == '') {
      this.greske = "Niste uneli sve neophodne podatke!";
      return;
    }
    if (!this.proveriDatum()) return;
    this.servis2.dostupnostStolova(this.restoran._id, this.rezervacija.datum, this.rezervacija.vreme).subscribe((stolovi) => {
      localStorage.setItem('stolovi', JSON.stringify(stolovi));
      localStorage.setItem('rezervacija_trenutna', JSON.stringify(this.rezervacija));
      this.ruter.navigate(['rezervacija_panel']);
    });
  }

  jelovnik() {
    this.ruter.navigate(['porucivanje']);
  }

}
