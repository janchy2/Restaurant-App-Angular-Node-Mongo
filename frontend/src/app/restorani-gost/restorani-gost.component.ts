import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-restorani-gost',
  templateUrl: './restorani-gost.component.html',
  styleUrls: ['./restorani-gost.component.css']
})
export class RestoraniGostComponent implements OnInit {
  constructor(private ruter: Router, private servis: RestoranService) { }

  restorani: Restoran[] = []
  pretrazeni: Restoran[] = []
  naziv: string = ''
  tip: string = ''
  adresa: string = ''

  ngOnInit() {

    this.servis.dohvatiSveRestorane().subscribe((restorani) => {
      this.restorani = restorani;
      this.pretrazeni = restorani;
      this.restorani.forEach(restoran => {
        if (restoran.zbir_ocena)
          restoran.prosecna_ocena = restoran.zbir_ocena / restoran.broj_ocena;
        else restoran.prosecna_ocena = 0;
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
  
  pretrazi() {
    this.pretrazeni = this.restorani.filter(restoran => {
      let slican_naziv = true;
      if (this.naziv) slican_naziv = restoran.naziv.toLowerCase().includes(this.naziv.toLowerCase());
      let slican_tip = true;
      if (this.tip) slican_tip = restoran.tip.toLowerCase().includes(this.tip.toLowerCase());
      let slicna_adresa = true;
      if (this.adresa) slicna_adresa = restoran.adresa.toLowerCase().includes(this.adresa.toLowerCase());
      return slican_naziv && slican_tip && slicna_adresa;
    });
  }

  pregledRestorana(r: Restoran, event: Event) {
    event.preventDefault();
    localStorage.setItem('za_pregled', JSON.stringify(r));
    this.ruter.navigate(['restoran']);
  }

  sirinaZvezdice(prosecnaOcena: number, zvezdica: number): number {
    if (prosecnaOcena >= zvezdica) {
      return 100;
    } else if (prosecnaOcena + 1 > zvezdica) {
      return (prosecnaOcena % 1) * 100;
    } else {
      return 0;
    }
  }
}
