import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allDataUrl = 'http://localhost:2020/'


  constructor(private http: HttpClient) { }


  getGlobalData() {
    return this.http.get<{ _id: string; total_confirmed: number; total_deaths: number, total_recovered: number;total_active: number; last_date_updated: string; country_statistics: Array<string|number>}>(this.allDataUrl).pipe(
      map((result) => {

        return result;
      })
    );
  }

  getCountryData(countryCode: string) {
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
            if (contry['code'] == 'US') {
              test.push(contry);
              //console.log(test);
            } else {
              test.push(contry['NG']);
              //console.log(test);
            }
          });
          //console.log(test);

          return test;
        })
      );
  }


}
