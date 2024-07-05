import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {

  constructor(private ruter: Router){}

  prijaviSe() {
    this.ruter.navigate(['prijava'])
  }

  registrujSe() {
    this.ruter.navigate(['registracija'])
  }

}
