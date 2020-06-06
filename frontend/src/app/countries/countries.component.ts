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
  globalData;
  datatable;
  countries;
  dateWiseData;
  selectedCountryData;

  queryp;

  loading = true;

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
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
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        this.countries = result.country_statistics;
        let test = this.countries;
        let countryArray;

          // test.forEach((country) => {
          //   countryArray = [];
          //   countryArray.push(country);
          //   this.countries = countryArray;
          //   //console.log(this.countries);
          // });

          console.log((this.countries));

      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
