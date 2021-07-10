import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  private dateWiseDataUrl = 'https://ncovid19api.herokuapp.com/timeline/';

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  datatable: any[] = [];
  countries: any;
  dateWiseData;
  countryFlag = `https://www.countryflags.io/NG/flat/64.png`;

  daten;


  country;

  queryp;



  loading = true;

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    LineChart: 'LineChart',
    height: 500,
    title: 'Country Stats',
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,
    },
  };

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.updateCountry('Nigeria');
    this.updateChart('Nigeria');
  }

  updateCountry(country: string) {
    console.log(country);


    this.dataService.getCountryData(country).subscribe({
      next: (result) => {
        this.countries = result[0];
        this.countryFlag = `https://www.countryflags.io/${this.countries.code}/flat/64.png`;
        console.log(this.countries);

      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  updateChart(country: string) {
    this.chart = Object.create(this.chart);
    this.datatable = [];
    this.dataService.getDatewiseData(country).subscribe((result) => {
      this.dateWiseData = result;
      this.dateWiseData.forEach(data => {
        this.daten = new Date(Date.parse(data.date))
          this.datatable.push([this.daten, data.cases]);
          this.datatable = Object.assign([], this.datatable)
      });
    });
  }
}
