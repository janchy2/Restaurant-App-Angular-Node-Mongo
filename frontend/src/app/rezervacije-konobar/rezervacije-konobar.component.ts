import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { RestoranService } from '../services/restoran.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-rezervacije-konobar',
  templateUrl: './rezervacije-konobar.component.html',
  styleUrls: ['./rezervacije-konobar.component.css']
})
export class RezervacijeKonobarComponent implements OnInit {

  constructor(private ruter: Router, private servis1: RezervacijaService, private servis2: RestoranService, private servis3: KorisnikService) { }

  obradjene: Rezervacija[] = []
  neobradjene: Rezervacija[] = []
  konobar: Korisnik = new Korisnik()

  ngOnInit(): void {
    let konobar = localStorage.getItem('ulogovan');
    if (konobar) {
      this.konobar = JSON.parse(konobar);
    }
    this.servis1.dohvatiNeobradjene(this.konobar.restoran).subscribe((neobradjene) => {
      this.neobradjene = neobradjene;
      this.servis1.dohvatiZaKonobara(this.konobar.kor_ime).subscribe((obradjene) => {
        this.obradjene = obradjene;
        this.obradjene.forEach(rez => {
          rez.pola_sata = (new Date().getTime() - new Date(rez.datum).getTime() >= 30 * 60 * 1000);
        });
      });
    });
  }

  obradi(r: Rezervacija) {
    localStorage.setItem('trenutna_rezervacija', JSON.stringify(r));
    this.servis1.dostupnostStolova(this.konobar.restoran, r.formatiran_datum, r.vreme).subscribe((stolovi) => {
      localStorage.setItem('stolovi', JSON.stringify(stolovi));
      this.servis2.dohvatiPoId(this.konobar.restoran).subscribe((restoran) => {
        localStorage.setItem('restoran', JSON.stringify(restoran));
        this.ruter.navigate(['obrada_rezervacije']);
      });
    });
  }

  dosli(r: Rezervacija) {
    this.servis1.potvrdiDolazak(r._id).subscribe(() => {
      alert('Potvrđeno da su gosti došli!');
      this.ngOnInit();
    });
  }

  nisuDosli(r: Rezervacija) {
    this.servis1.potvrdiNedolazak(r._id).subscribe(() => {
      this.servis1.brojNeispunjenihZaGosta(r.korisnikId).subscribe((broj) => {
        if (broj == 3) {
          this.servis3.deaktivirajKorisnika(r.ime_gosta).subscribe(() => {
            alert('Potvrđeno da gosti nisu došli!');
            this.ngOnInit();
          });
        }
      });
    });
  }

  produzi(r: Rezervacija) {
    this.servis1.moguceProduzenje(r.restoranId, r.datum).subscribe((moguce) => {
      if (moguce) {
        this.servis1.produzi(r._id).subscribe(() => {
          alert('Rezervacija produžena za sat vremena!');
          this.ngOnInit();
        });
      }
      else {
        alert('Ne možete da produžite rezervaciju jer sledeća rezervacija zauzima termin!');
      }
    })
  }
}

