import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { NovaLozinkaComponent } from './nova-lozinka/nova-lozinka.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminPregledComponent } from './admin-pregled/admin-pregled.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { DodavanjeRestoranaComponent } from './dodavanje-restorana/dodavanje-restorana.component';
import { RestoranComponent } from './restoran/restoran.component';
import { RezervacijaPanelComponent } from './rezervacija-panel/rezervacija-panel.component';
import { DodavanjeKonobaraComponent } from './dodavanje-konobara/dodavanje-konobara.component';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { ObradaRezervacijeComponent } from './obrada-rezervacije/obrada-rezervacije.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { RestoraniGostComponent } from './restorani-gost/restorani-gost.component';
import { PorucivanjeComponent } from './porucivanje/porucivanje.component';
import { PorudzbineKonobarComponent } from './porudzbine-konobar/porudzbine-konobar.component';
import { PorudzbineGostComponent } from './porudzbine-gost/porudzbine-gost.component';
import { StatistikaComponent } from './statistika/statistika.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "prijava", component: PrijavaComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "admin", component: PrijavaAdminComponent },
  { path: "promena_lozinke", component: PromenaLozinkeComponent },
  { path: "nova_lozinka", component: NovaLozinkaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "admin/pregled", component: AdminPregledComponent },
  { path: "admin/zahtevi", component: AdminZahteviComponent },
  { path: "admin/dodavanje_restorana", component: DodavanjeRestoranaComponent },
  { path: "restoran", component: RestoranComponent },
  { path: "rezervacija_panel", component: RezervacijaPanelComponent },
  { path: "admin/dodavanje_konobara", component: DodavanjeKonobaraComponent },
  { path: "rezervacije_konobar", component: RezervacijeKonobarComponent },
  { path: "obrada_rezervacije", component: ObradaRezervacijeComponent },
  { path: "rezervacije_gost", component: RezervacijeGostComponent },
  { path: "restorani_gost", component: RestoraniGostComponent },
  { path: "porucivanje", component: PorucivanjeComponent },
  { path: "porudzbine_konobar", component: PorudzbineKonobarComponent },
  { path: "porudzbine_gost", component: PorudzbineGostComponent },
  { path: "statistika", component: StatistikaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
