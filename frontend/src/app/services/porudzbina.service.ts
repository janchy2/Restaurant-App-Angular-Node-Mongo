import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/porudzbina'

  dodajPorudzbinu(p: Porudzbina) {
    return this.http.post(`${this.uri}/dodajPorudzbinu`, p);
  }

  dohvatiZaRestoran(restoranId: string) {
    return this.http.post<Porudzbina[]>(`${this.uri}/dohvatiZaRestoran`, { restoranId: restoranId });
  }

  prihvati(id: string, konobar: string, procenjeno_vreme: string) {
    let podaci = {
      id: id,
      konobar: konobar,
      procenjeno_vreme: procenjeno_vreme
    }
    return this.http.post(`${this.uri}/prihvati`, podaci);
  }

  odbij(id: string) {
    return this.http.post(`${this.uri}/odbij`, { id: id });
  }

  dohvatiAktuelneZaGosta(korisnikId: string) {
    return this.http.post<Porudzbina[]>(`${this.uri}/dohvatiAktuelneZaGosta`, { korisnikId: korisnikId });
  }

  dohvatiArhivuZaGosta(korisnikId: string) {
    return this.http.post<Porudzbina[]>(`${this.uri}/dohvatiArhivuZaGosta`, { korisnikId: korisnikId });
  }
}
