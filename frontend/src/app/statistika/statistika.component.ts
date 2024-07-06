import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { Korisnik } from '../models/korisnik';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {

  constructor(private ruter: Router, private servis: RezervacijaService) { }

  konobar: Korisnik = new Korisnik()
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Broj gostiju po danima za mene'
    },
    xAxis: {
      categories: [] as string[]
    },
    yAxis: {
      title: {
        text: 'Broj gostiju'
      }
    },
    series: [{
      name: 'Broj gostiju',
      type: 'column',
      data: [] as number[]
    }]
  };

  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Raspodela gostiju po konobarima za restoran'
    },
    series: [{
      name: 'Broj gostiju',
      type: 'pie',
      data: [] as Highcharts.PointOptionsObject[]
    }]
  };

  histogramChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Prosečan broj rezervacija po danu u nedelji za sve restorane'
    },
    xAxis: {
      categories: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
      title: {
        text: 'Dan u nedelji'
      }
    },
    yAxis: {
      title: {
        text: 'Prosečan broj rezervacija'
      }
    },
    series: [{
      name: 'Prosečan broj rezervacija',
      type: 'column',
      data: []
    }]
  };



  ngOnInit(): void {
    let konobar = localStorage.getItem('ulogovan');
    if (konobar) {
      this.konobar = JSON.parse(konobar);
    }
    this.statistika1();
    this.statistika2();
    this.statistika3();
  }

  predjiNa(putanja: string) {
    this.ruter.navigate([putanja]);
  }

  izloguj() {
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

  statistika1() {
    this.servis.statistika1(this.konobar.kor_ime).subscribe((statistika) => {
      const categories = statistika.map(stat => stat.datum);
      const data = statistika.map(stat => stat.broj_gostiju);

      (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories = categories;
      if (this.chartOptions.series) {
        (this.chartOptions.series[0] as Highcharts.SeriesColumnOptions).data = data;
      }

      Highcharts.chart('chartContainer', this.chartOptions);
    });
  }

  statistika2() {
    this.servis.statistika2(this.konobar.restoran).subscribe((statistika) => {
      const data = statistika.map(stat => ({
        name: stat.konobar,
        y: stat.broj_gostiju
      }));

      if (this.pieChartOptions.series) {
        (this.pieChartOptions.series[0] as Highcharts.SeriesPieOptions).data = data;
      }

      Highcharts.chart('pieChartContainer', this.pieChartOptions);
    });
  }

  statistika3() {
    this.servis.statistika3().subscribe((statistika) => {
      const categories = statistika.map(dan => dan.dan);
      const data = statistika.map(dan => dan.prosek);

      (this.histogramChartOptions.xAxis as Highcharts.XAxisOptions).categories = categories;
      if (this.histogramChartOptions.series) {
        (this.histogramChartOptions.series[0] as Highcharts.SeriesColumnOptions).data = data;
      }

      Highcharts.chart('histogramContainer', this.histogramChartOptions);
    })
  }
}
