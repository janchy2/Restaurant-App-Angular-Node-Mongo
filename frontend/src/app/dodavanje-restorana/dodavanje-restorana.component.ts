import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Jelo, Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';

@Component({
  selector: 'app-dodavanje-restorana',
  templateUrl: './dodavanje-restorana.component.html',
  styleUrls: ['./dodavanje-restorana.component.css']
})
export class DodavanjeRestoranaComponent implements OnInit {

  constructor(private ruter: Router, private servis: RestoranService) { }

  restoran: Restoran = new Restoran()
  greske: string = ''

  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef<HTMLCanvasElement> | undefined;
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null
  canvasDataUrl: string | null = null

  tipElementa: string = 'sto'
  brojMesta: number = 4

  ngOnInit() {
    if (this.canvasElement) {
      this.canvas = this.canvasElement.nativeElement;
      this.ctx = this.canvas.getContext('2d');
    }
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  klikNaKanvas(event: MouseEvent) {
    const rect = this.canvas?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.dodajElement(x, y);
    }
  }

  dodajElement(x: number, y: number) {
    if (this.tipElementa === 'sto') {
      this.greske = ''
      if (this.brojMesta < 1) {
        this.greske = 'Broj mesta mora biti veći od 0!'
      }
      const poluprecnik = 20;
      if (!this.preklapaSe(x, y, poluprecnik * 2, poluprecnik * 2)) {
        this.restoran.raspored.push({
          tip: 'sto',
          x: x,
          y: y,
          poluprecnik: poluprecnik,
          mesta: this.brojMesta
        });
        this.nacrtajKrug(x, y, poluprecnik, this.brojMesta);
      }
    } else {
      const sirina = 50;
      const visina = 30;
      if (!this.preklapaSe(x, y, sirina, visina)) {
        this.restoran.raspored.push({
          tip: this.tipElementa,
          x: x,
          y: y,
          sirina: sirina,
          visina: visina
        });
        this.nacrtajPravougaonik(x, y, sirina, visina, this.tipElementa);
      }
    }
  }

  nacrtajKrug(x: number, y: number, poluprecnik: number, mesta: number) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, poluprecnik, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(mesta.toString(), x, y);
    }
  }

  nacrtajPravougaonik(x: number, y: number, sirina: number, visina: number, tip: string) {
    if (this.ctx) {
      this.ctx.strokeRect(x, y, sirina, visina);

      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      const textX = x + sirina / 2;
      const textY = y + visina / 2;
      this.ctx.fillText(tip, textX, textY);
    }
  }

  preklapaSe(x: number, y: number, sirina: number, visina: number): boolean {
    if (!this.stajeNaPlatno(x, y, sirina, visina)) {
      return true;
    }
    return this.restoran.raspored.some(element => {
      const distX = Math.abs(element.x - x);
      const distY = Math.abs(element.y - y);
      if (element.tip === 'sto') {
        const poluprecnik = element.poluprecnik;
        return distX < poluprecnik + sirina / 2 && distY < poluprecnik + visina / 2;
      } else {
        return distX < element.sirina && distY < element.visina;
      }
    });
  }

  stajeNaPlatno(x: number, y: number, sirina: number, visina: number): boolean {
    if (!this.canvas) return false;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    return x >= 0 && y >= 0 && (x + sirina) <= canvasWidth && (y + visina) <= canvasHeight;
  }

  proveriRaspored(raspored: any[]): boolean {
    if (!Array.isArray(raspored)) {
      return false;
    }
    for (const element of raspored) {
      if (typeof element !== 'object') return false;
      if (!(typeof element.tip === 'string' &&
        typeof element.x === 'number' &&
        typeof element.y === 'number')) return false;

      if (element.tip === 'sto') {
        if (!(typeof element.poluprecnik === 'number' &&
          typeof element.mesta === 'number')) return false;
      } else if (element.tip === 'toalet' || element.tip === 'kuhinja') {
        if (!(typeof element.sirina === 'number' &&
          typeof element.visina === 'number')) return false;
      } else {
        return false;
      }
    }
    return true;
  }

  unetJSON(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = JSON.parse(e.target.result);
          this.greske = '';
          if (!this.proveriRaspored(json.raspored)) {
            this.greske = 'Raspored nije u dobrom formatu!'
          }
          else {
            this.restoran.raspored = json.raspored;
          }
        } catch (error) {
          this.greske = 'Greška pri čitanju JSON fajla!';
        }
      };
      reader.readAsText(file);
    }
  }

  unetJelovnik(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = JSON.parse(e.target.result);
          this.greske = '';
          if (Array.isArray(json.jelovnik)) {
            this.greske = '';
            this.restoran.jelovnik = json.jelovnik.map((jelo: Jelo) => {
              return {
                naziv: jelo.naziv,
                cena: jelo.cena,
                sastojci: jelo.sastojci,
                slika: jelo.slika
              };
            });
          } else {
            this.greske = 'Jelovnik nije u dobrom formatu!';
          }
        } catch (error) {
          this.greske = 'Greška pri čitanju JSON fajla!';
        }
      };
      reader.readAsText(file);
    }
  }

  dodaj() {
    this.greske = ''

    const brojStolova = this.restoran.raspored.filter(element => element.tip === 'sto').length;
    const brojToaleta = this.restoran.raspored.filter(element => element.tip === 'toalet').length;
    const brojKuhinja = this.restoran.raspored.filter(element => element.tip === 'kuhinja').length;

    if (brojStolova < 3 || brojToaleta < 1 || brojKuhinja < 1) {
      this.greske += 'Restoran mora da ima najmanje jednu kuhinju, toalet i najmanje tri stola!';
    }

    let regex = /\+381\ [0-9]{9}$/
    if (!regex.test(this.restoran.telefon)) {
      this.greske += " Loš telefon!";
    }

    regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(this.restoran.mejl)) {
      this.greske += " Loš i-mejl!";
    }

    if (this.restoran.naziv == '') {
      this.greske += " Niste uneli naziv!";
    }
    if (this.restoran.adresa == '') {
      this.greske += " Niste uneli adresu!";
    }
    if (this.restoran.tip == '') {
      this.greske += " Niste uneli tip!";
    }
    if (this.restoran.kontakt_osoba == '') {
      this.greske += " Niste uneli kontakt osobu!";
    }
    if (this.restoran.opis == '') {
      this.greske += " Niste uneli opis!";
    }

    this.servis.dohvatiKoordinate(this.restoran.adresa).subscribe((koord: any) => {
      if (koord.length == 0) {
        this.greske += " Adresa ne postoji!";
      }
      if (this.greske != '') return;
      this.servis.dohvatiSveRestorane().subscribe((restorani) => {
        restorani.forEach(restoran => {
          if (restoran.naziv == this.restoran.naziv && restoran.adresa == this.restoran.adresa) {
            this.greske = 'Restoran sa datim nazivom i adresom već postoji!'
            return;
          }
        });
        this.servis.dodajRestoran(this.restoran).subscribe(() => {
          alert('Restoran dodat!');
          this.ruter.navigate(['/admin/pregled']);
        });
      })
    })
  }

}
