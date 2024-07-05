import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri_gost = 'http://localhost:4000/gost'
  uri_konobar = 'http://localhost:4000/konobar'
  uri_admin = 'http://localhost:4000/admin'
  uri_korisnik = 'http://localhost:4000/korisnik'

  registracijaGosta(g: Korisnik) {
    return this.http.post(`${this.uri_gost}/registracija`, g);
  }

  dohvatiSveGoste() {
    return this.http.get<Korisnik[]>(`${this.uri_gost}/dohvatiSve`);
  }

  dohvatiSveAktivneGoste() {
    return this.http.get<Korisnik[]>(`${this.uri_gost}/dohvatiAktivne`);
  }

  registracijaKonobara(k: Korisnik) {
    return this.http.post(`${this.uri_konobar}/registracija`, k);
  }

  dohvatiSveKonobare() {
    return this.http.get<Korisnik[]>(`${this.uri_konobar}/dohvatiSve`);
  }

  prijava(kor_ime: string, lozinka: string) {
    const podaci = {
      kor_ime: kor_ime,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri_korisnik}/prijava`, podaci);
  }

  dohvatiPoKorImenu(kor_ime: string) {
    return this.http.post<Korisnik>(`${this.uri_korisnik}/dohvatiPoKorImenu`, { kor_ime: kor_ime });
  }

  promenaLozinke(kor_ime: string, lozinka: string) {
    const podaci = {
      kor_ime: kor_ime,
      lozinka: lozinka,
    };
    return this.http.post(`${this.uri_korisnik}/promenaLozinke`, podaci);
  }

  azurirajPodatak(kor_ime: string, polje: string, vrednost: string) {
    const podaci = {
      kor_ime: kor_ime,
      polje: polje,
      vrednost: vrednost
    };
    return this.http.post(`${this.uri_korisnik}/azurirajPodatak`, podaci);
  }

  azurirajSliku(kor_ime: string, vrednost: string | ArrayBuffer | null) {
    const podaci = {
      kor_ime: kor_ime,
      vrednost: vrednost
    };
    return this.http.post(`${this.uri_korisnik}/azurirajSliku`, podaci);
  }

  deaktivirajKorisnika(kor_ime: string) {
    return this.http.post(`${this.uri_korisnik}/deaktivirajKorisnika`, { kor_ime: kor_ime });
  }

  odblokirajKorisnika(kor_ime: string) {
    return this.http.post(`${this.uri_korisnik}/odblokirajKorisnika`, { kor_ime: kor_ime });
  }

  dohvatiZahteve() {
    return this.http.get<Korisnik[]>(`${this.uri_gost}/dohvatiZahteve`);
  }

  prihvatiZahtev(kor_ime: string) {
    return this.http.post(`${this.uri_gost}/prihvatiZahtev`, { kor_ime: kor_ime });
  }

  odbijZahtev(kor_ime: string) {
    return this.http.post(`${this.uri_gost}/odbijZahtev`, { kor_ime: kor_ime });
  }
}
