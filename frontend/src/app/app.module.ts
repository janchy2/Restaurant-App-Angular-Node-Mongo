import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
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
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    PrijavaAdminComponent,
    PromenaLozinkeComponent,
    NovaLozinkaComponent,
    ProfilComponent,
    AdminPregledComponent,
    AdminZahteviComponent,
    DodavanjeRestoranaComponent,
    RestoranComponent,
    RezervacijaPanelComponent,
    DodavanjeKonobaraComponent,
    RezervacijeKonobarComponent,
    ObradaRezervacijeComponent,
    RezervacijeGostComponent,
    RestoraniGostComponent,
    PorucivanjeComponent,
    PorudzbineKonobarComponent,
    PorudzbineGostComponent,
    StatistikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
