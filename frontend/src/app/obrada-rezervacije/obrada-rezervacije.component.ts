import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { Restoran } from '../models/restoran';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-obrada-rezervacije',
  templateUrl: './obrada-rezervacije.component.html',
  styleUrls: ['./obrada-rezervacije.component.css']
})
export class ObradaRezervacijeComponent {
  constructor(private ruter: Router, private servis: RezervacijaService) { }

  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef<HTMLCanvasElement> | undefined;
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null
  canvasDataUrl: string | null = null

  restoran: Restoran = new Restoran()
  stolovi: any[] = []
  rezervacija: Rezervacija = new Rezervacija()
  greske: string = ''
  izabran: any
  izabran_sto: boolean = false
  konobar: Korisnik = new Korisnik()
  selektovan_sto: any


  ngOnInit() {
    if (this.canvasElement) {
      this.canvas = this.canvasElement.nativeElement;
      this.ctx = this.canvas.getContext('2d');
    }
    let stolovi = localStorage.getItem('stolovi');
    if (stolovi) {
      this.stolovi = JSON.parse(stolovi);
    }
    let konobar = localStorage.getItem('ulogovan');
    if (konobar) {
      this.konobar = JSON.parse(konobar);
    }
    let restoran = localStorage.getItem('restoran');
    if (restoran) {
      this.restoran = JSON.parse(restoran);
    }
    let rezervacija = localStorage.getItem('trenutna_rezervacija');
    if (rezervacija) {
      this.rezervacija = JSON.parse(rezervacija);
    }
    this.nacrtajRaspored();
  }

  nacrtajRaspored() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
    this.restoran.raspored.forEach(element => {
      if (element.tip == 'sto') {
        this.nacrtajKrug(element.x, element.y, element.poluprecnik, element.mesta);
      }
      else {
        this.nacrtajPravougaonik(element.x, element.y, element.sirina, element.visina, element.tip);
      }
    });

    this.stolovi.forEach(sto => {
      if (sto.rezervisan)
        this.obojiSto(sto, 'red');
    });

    this.stolovi.forEach(sto => {
      if (sto.x == this.rezervacija.x_stola && sto.y == this.rezervacija.y_stola) {
        if (sto.rezervisan)
          this.obojiSto(sto, 'orange');
        else
          this.obojiSto(sto, 'yellow');
      }
    });
  }

  obojiSto(sto: any, boja: string) {
    if (this.ctx) {
      this.ctx.clearRect(sto.x - 20, sto.y - 20, 40, 40);
      this.ctx.beginPath();
      this.ctx.arc(sto.x, sto.y, 20, 0, Math.PI * 2, false);
      this.ctx.stroke();
      if (boja != 'white') {
        this.ctx.fillStyle = boja;
        this.ctx.fill();
      }
      this.ctx.closePath();
      if (boja == 'white') {
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(sto.mesta.toString(), sto.x, sto.y);
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

  klikNaKanvas(event: MouseEvent) {
    if (this.rezervacija.x_stola != 0 && this.rezervacija.y_stola != 0) return;
    const rect = this.canvas?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.obradiIzabrano(x, y);
    }
  }

  obradiIzabrano(x: number, y: number) {
    let sada_izabran = false;
    this.stolovi.forEach(sto => {
      const distX = Math.abs(sto.x - x);
      const distY = Math.abs(sto.y - y);
      const poluprecnik = 20;
      if (sto.rezervisan && distX <= poluprecnik && distY <= poluprecnik) {
        sada_izabran = true;
      }
      if (!sto.rezervisan && distX <= poluprecnik && distY <= poluprecnik) {
        if (this.izabran_sto) {
          this.obojiSto(this.izabran, 'white');
        }
        sada_izabran = true;
        this.izabran_sto = true;
        this.obojiSto(sto, 'green');
        this.izabran = sto;
      }
    });
    if (!sada_izabran && this.izabran_sto) {
      this.izabran_sto = false;
      this.obojiSto(this.izabran, 'white');
    }
  }

  izabranLista() {
    if (this.izabran_sto) {
      this.obojiSto(this.izabran, 'white');
    }
    this.stolovi.forEach(sto => {
      if (sto.x == this.selektovan_sto) {
        this.obojiSto(sto, 'green');
        this.izabran = sto;
        this.izabran_sto = true;
      }
    });
  }

  prihvati() {
    if (this.rezervacija.x_stola != 0 && this.rezervacija.y_stola != 0) {
      this.stolovi.forEach(sto => {
        if (sto.x == this.rezervacija.x_stola && sto.y == this.rezervacija.y_stola) {
          if (sto.rezervisan) {
            this.greske = 'Ne možete da prihvatite ovu rezervaciju jer je sto već zauzet!';
            return;
          }
          else
            this.obojiSto(sto, 'red');
        }
      });
      if (this.greske != '') return;
      this.servis.prihvatiPanel(this.rezervacija._id, this.konobar.kor_ime).subscribe(() => {
        alert('Rezervacija prihvaćena!');
        localStorage.removeItem('stolovi');
        localStorage.removeItem('restoran');
        localStorage.removeItem('trenutna_rezervacija');
        this.ruter.navigate(['rezervacije_konobar']);
      });
    }

    else {
      this.greske = '';
      if (this.rezervacija.mesta > this.izabran.mesta) {
        this.greske = 'Sto koji ste izabrali nema dovoljno mesta!';
        return;
      }
      this.servis.prihvatiForma(this.rezervacija._id, this.izabran.x, this.izabran.y, this.konobar.kor_ime).subscribe(() => {
        alert('Rezervacija prihvaćena!');
        localStorage.removeItem('stolovi');
        localStorage.removeItem('restoran');
        localStorage.removeItem('trenutna_rezervacija');
        this.ruter.navigate(['rezervacije_konobar']);
      })
    }
  }

  odbij() {
    this.greske = '';
    if (this.rezervacija.razlog == '') {
      this.greske = 'Morate da unese razlog za odbijanje!';
      return;
    }
    if (this.rezervacija.x_stola != 0 && this.rezervacija.y_stola != 0) {
      this.stolovi.forEach(sto => {
        if (sto.x == this.rezervacija.x_stola && sto.y == this.rezervacija.y_stola) {
          if (sto.rezervisan) return;
          this.obojiSto(sto, 'white');
        }
      });
    }
    else {
      if (this.izabran) {
        this.obojiSto(this.izabran, 'white');
      }
    }
    this.servis.odbij(this.rezervacija._id, this.rezervacija.razlog).subscribe(() => {
      alert('Rezervacija odbijena!');
      localStorage.removeItem('stolovi');
      localStorage.removeItem('restoran');
      localStorage.removeItem('trenutna_rezervacija');
      this.ruter.navigate(['rezervacije_konobar']);
    })
  }
}

