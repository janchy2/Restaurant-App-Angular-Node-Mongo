import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/restoran'

  dodajRestoran(r: Restoran) {
    return this.http.post(`${this.uri}/dodajRestoran`, r);
  }

  dohvatiSveRestorane() {
    return this.http.get<Restoran[]>(`${this.uri}/dohvatiSve`);
  }

  dodajRadnoVreme(naziv: string, adresa: string, radno_vreme: string) {
    let podaci = {
      naziv: naziv,
      adresa: adresa,
      radno_vreme: radno_vreme
    }
    return this.http.post(`${this.uri}/dodajRadnoVreme`, podaci);
  }

  dohvatiKoordinate(adresa: string) {
    return this.http.get(`https://nominatim.openstreetmap.org/search?format=json&q=${adresa}`);
  }

  dohvatiPoId(id: string) {
    return this.http.post<Restoran>(`${this.uri}/dohvatiPoId`, { id: id });
  }

  dodajOcenu(id: string, zbir_ocena: number, broj_ocena: number) {
    let podaci = {
      id: id,
      zbir_ocena: zbir_ocena,
      broj_ocena: broj_ocena
    }
    return this.http.post(`${this.uri}/dodajOcenu`, podaci);
  }
}
