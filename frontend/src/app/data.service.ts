import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allDataUrl = 'https://fast-depths-66478.herokuapp.com/'


  constructor(private http: HttpClient) { }


  getGlobalData() {
    return this.http.get<{ _id: string; total_confirmed: number; total_deaths: number, total_recovered: number;total_active: number; last_date_updated: string; country_statistics: Array<string|number>}>(this.allDataUrl).pipe(
      map((result) => {

        return result;
      })
    );
  }

  getCountryData(countryN: string) {
    let test: any[] =[];
    return this.http
      .get<{
        _id: string;
        total_confirmed: number;
        total_deaths: number;
        total_recovered: number;
        total_active: number;
        last_date_updated: string;
        country_statistics: Array<string | number>;
      }>(this.allDataUrl)
      .pipe(
        map((result) => {
          //console.log(result.country_statistics);

          result.country_statistics.forEach((contry) => {
            if (contry['country'] == countryN || contry['code'] == countryN) {
              console.log(contry);

              test = Array(contry);
              //console.log(test);
            } else {
              test.push(contry['NG']);
              //console.log(test);
            }
          });
          console.log(test);

          return test;
        })
      );
  }

  getDatewiseData(country: string) {
    return this.http.get(`https://ncovid19api.herokuapp.com/timeline/${country}`).pipe(
      map((result) => {
        return result;
      })
    );
  }


}
