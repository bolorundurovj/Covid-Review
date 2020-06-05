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
    return this.http.get<{ _id: string; total_confirmed: number; total_deaths: number, total_recovered: number; last_date_updated: string; country_statistics: Array<Text>}>(this.allDataUrl).pipe(
      map((result) => {

        return result;
      })
    );
  }

}
