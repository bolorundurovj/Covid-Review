import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData ;
  datatable = [];

  loading = true;

  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    height: 500,
    title: 'World Stats',
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,

  }}

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result.country_statistics);
        this.totalConfirmed = result.total_confirmed;
        this.totalDeaths = result.total_deaths;
        this.totalRecovered = result.total_recovered;
        this.totalActive = result.total_active;

        this.globalData = result.country_statistics;

        this.initChart('c');
        },
        complete: () => {
          this.loading = false;
        }
    });
  }

  initChart(caseType: string) {

    // this.datatable.push(['Country', 'Cases']);
    this.datatable =[];
    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == 'c') {
        if (cs.confirmed > 10000) {
          value = cs.confirmed;
          this.datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'r') {
        if (cs.recovered > 2000) {
          value = cs.recovered;
          this.datatable.push([cs.country, value]);
        }
      }

      // if (caseType == 'a') {
      //   if (cs.active > 2000) {
      //     value = cs.active;
      //     this.datatable.push([cs.country, value]);
      //   }
      // }

      if (caseType == 'd') {
        if (cs.deaths > 1000) {
          value = cs.deaths;
          this.datatable.push([cs.country, value]);
        }
      }

      //console.log(value);
    });

  }

}
