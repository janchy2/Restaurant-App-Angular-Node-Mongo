import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  gosti: Korisnik[] = []
  ima_zahteva: boolean = false;

  ngOnInit() {
    this.ima_zahteva = false;
    this.servis.dohvatiZahteve().subscribe((gosti) => {
      this.gosti = gosti;
      if (this.gosti.length > 0) this.ima_zahteva = true;
    });
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  pregled(k: Korisnik) {
    localStorage.setItem('za_pregled', JSON.stringify(k));
    this.ruter.navigate(['profil']);
  }

  prihvati(k: Korisnik) {
    this.servis.prihvatiZahtev(k.kor_ime).subscribe(() => {
      this.ngOnInit();
    })
  }

  odbij(k: Korisnik) {
    this.servis.odbijZahtev(k.kor_ime).subscribe(() => {
      this.ngOnInit();
    })
  }
}
