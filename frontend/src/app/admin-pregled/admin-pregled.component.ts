import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';

@Component({
  selector: 'app-admin-pregled',
  templateUrl: './admin-pregled.component.html',
  styleUrls: ['./admin-pregled.component.css']
})
export class AdminPregledComponent implements OnInit {

  constructor(private ruter: Router, private servisK: KorisnikService, private servisR: RestoranService) { }

  gosti: Korisnik[] = []
  konobari: Korisnik[] = []
  restorani: Restoran[] = []
  radno_vreme: any = [
    { dan: 'Ponedeljak', otvara: '', zatvara: '' },
    { dan: 'Utorak', otvara: '', zatvara: '' },
    { dan: 'Sreda', otvara: '', zatvara: '' },
    { dan: 'Četvrtak', otvara: '', zatvara: '' },
    { dan: 'Petak', otvara: '', zatvara: '' },
    { dan: 'Subota', otvara: '', zatvara: '' },
    { dan: 'Nedelja', otvara: '', zatvara: '' },
  ];

  ngOnInit() {
    this.servisK.dohvatiSveGoste().subscribe((gosti) => {
      this.gosti = gosti;
      this.servisK.dohvatiSveKonobare().subscribe((konobari) => {
        this.konobari = konobari;
        this.servisR.dohvatiSveRestorane().subscribe((restorani) => {
          this.restorani = restorani;
        })
      });
    });
  }

  pregled(k: Korisnik) {
    localStorage.setItem('za_pregled', JSON.stringify(k));
    this.ruter.navigate(['profil']);
  }

  deaktiviraj(k: Korisnik) {
    this.servisK.deaktivirajKorisnika(k.kor_ime).subscribe(() => {
      this.ngOnInit();
    })
  }

  odblokiraj(k: Korisnik) {
    this.servisK.odblokirajKorisnika(k.kor_ime).subscribe(() => {
      this.ngOnInit();
    })
  }

  pregledRestorana(r: Restoran) {
    localStorage.setItem('za_pregled', JSON.stringify(r));
    this.ruter.navigate(['restoran']);
  }

  otvoriFormu(r: Restoran) {
    r.dodaj_vreme = true;
  }

  dodajRadnoVreme(r: Restoran) {
    const radno_vreme = this.radno_vreme.map((dan: { dan: any; otvara: any; zatvara: any; }) => {
      if (dan.otvara == '' || dan.zatvara == '') {
        return `${dan.dan}: zatvoren`;
      } else {
        return `${dan.dan}: ${dan.otvara}-${dan.zatvara}`;
      }
    }).join(', ');

    this.servisR.dodajRadnoVreme(r.naziv, r.adresa, radno_vreme).subscribe(() => {
      this.ngOnInit();
    })

  }
}
