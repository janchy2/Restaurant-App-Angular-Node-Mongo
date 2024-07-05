import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Sto } from '../models/sto';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/rezervacija'

  dodajRezervaciju(r: Rezervacija) {
    return this.http.post(`${this.uri}/dodajRezervaciju`, r);
  }

  dostupnostStolova(restoranId: string, datum: string, vreme: string) {
    let podaci = {
      restoranId: restoranId,
      datum: datum,
      vreme: vreme
    }
    return this.http.post<Sto[]>(`${this.uri}/dostupnostStolova`, podaci);
  }

  dohvatiNeobradjene(restoranId: string) {
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiNeobradjene`, { restoranId: restoranId });
  }

  dohvatiZaKonobara(konobar: string) {
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiZaKonobara`, { konobar: konobar });
  }

  prihvatiForma(id: string, x: number, y: number, konobar: string) {
    let podaci = {
      id: id,
      x: x,
      y: y,
      konobar: konobar
    }
    return this.http.post(`${this.uri}/prihvatiForma`, podaci);
  }
  prihvatiPanel(id: string, konobar: string) {
    let podaci = {
      id: id,
      konobar: konobar
    }
    return this.http.post(`${this.uri}/prihvatiPanel`, podaci);
  }

  odbij(id: string, razlog: string) {
    let podaci = {
      id: id,
      razlog: razlog
    }
    return this.http.post(`${this.uri}/odbij`, podaci);
  }

  potvrdiDolazak(id: string) {
    return this.http.post(`${this.uri}/potvrdiDolazak`, { id: id });
  }

  potvrdiNedolazak(id: string) {
    return this.http.post(`${this.uri}/potvrdiNedolazak`, { id: id });
  }

  produzi(id: string) {
    return this.http.post(`${this.uri}/produzi`, { id: id });
  }

  moguceProduzenje(restoranId: string, datum: string) {
    let podaci = {
      restoranId: restoranId,
      datum: datum
    }
    return this.http.post<boolean>(`${this.uri}/moguceProduzenje`, podaci);
  }

  brojNeispunjenihZaGosta(korisnikId: string) {
    return this.http.post<number>(`${this.uri}/brojNeispunjenihZaGosta`, { korisnikId: korisnikId });
  }

  dohvatiAktuelneZaGosta(korisnikId: string) {
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiAktuelneZaGosta`, { korisnikId: korisnikId });
  }

  dohvatiIstekleZaGosta(korisnikId: string) {
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiIstekleZaGosta`, { korisnikId: korisnikId });
  }

  otkazi(id: string) {
    return this.http.post(`${this.uri}/otkazi`, { id: id });
  }

  oceni(id: string, ocena: number, komentar: string) {
    let podaci = {
      id: id,
      ocena: ocena,
      komentar: komentar
    }
    return this.http.post(`${this.uri}/oceni`, podaci);
  }

  statistika1(konobar: string) {
    return this.http.post<any[]>(`${this.uri}/statistika1`, { konobar: konobar });
  }

  statistika2(restoranId: string) {
    return this.http.post<any[]>(`${this.uri}/statistika2`, { restoranId: restoranId });
  }

  statistika3() {
    return this.http.get<any[]>(`${this.uri}/statistika3`);
  }
}
