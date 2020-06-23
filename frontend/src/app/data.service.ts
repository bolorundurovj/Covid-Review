import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private allDataUrl = 'https://fast-depths-66478.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getGlobalData() {
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
          return result;
        })
      );
  }

  getCountryData(countryN: string) {
    let test: any[] = [];
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
    let countries = [
      {
        country: 'US',
        code: 'US',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_united_states_of_america.png',
        coordinates: [-95.712891, 37.09024],
      },
      {
        country: 'Canada',
        code: 'CA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_canada.png',
        coordinates: [-106.346771, 56.130366],
      },
      {
        country: 'United Kingdom',
        code: 'GB',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_united_kingdom.png',
        coordinates: [-3.435973, 55.378051],
      },
      {
        country: 'China',
        code: 'CN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_china.png',
        coordinates: [112.2707, 30.9756],
      },
      {
        country: 'Netherlands',
        code: 'NL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_netherlands.png',
        coordinates: [5.291266, 52.132633],
      },
      {
        country: 'Australia',
        code: 'AU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_australia.png',
        coordinates: [133.775136, -25.274398],
      },
      {
        country: 'Denmark',
        code: 'DK',
        flag: 'https://assets.hackbotone.com/images/flags/flag_denmark.png',
        coordinates: [9.501785, 56.26392],
      },
      {
        country: 'France',
        code: 'FR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_france.png',
        coordinates: [2.213749, 46.227638],
      },
      {
        country: 'Afghanistan',
        code: 'AF',
        flag: 'https://assets.hackbotone.com/images/flags/flag_afghanistan.png',
        coordinates: [67.709953, 33.93911],
      },
      {
        country: 'Albania',
        code: 'AL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_albania.png',
        coordinates: [20.168331, 41.153332],
      },
      {
        country: 'Algeria',
        code: 'DZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_algeria.png',
        coordinates: [1.659626, 28.033886],
      },
      {
        country: 'Andorra',
        code: 'AD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_andorra.png',
        coordinates: [1.601554, 42.546245],
      },
      {
        country: 'Angola',
        code: 'AO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_angola.png',
        coordinates: [17.873887, -11.202692],
      },
      {
        country: 'Antigua and Barbuda',
        code: 'AG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_antigua.png',
        coordinates: [-61.796428, 17.060816],
      },
      {
        country: 'Argentina',
        code: 'AR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_argentina.png',
        coordinates: [-63.616672, -38.416097],
      },
      {
        country: 'Armenia',
        code: 'AM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_armenia.png',
        coordinates: [45.038189, 40.069099],
      },
      {
        country: 'Austria',
        code: 'AT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_austria.png',
        coordinates: [14.550072, 47.516231],
      },
      {
        country: 'Azerbaijan',
        code: 'AZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_azerbaijan.png',
        coordinates: [47.576927, 40.143105],
      },
      {
        country: 'Bahamas',
        code: 'BS',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bahamas.png',
        coordinates: [-77.39628, 25.03428],
      },
      {
        country: 'Bahrain',
        code: 'BH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bahrain.png',
        coordinates: [50.637772, 25.930414],
      },
      {
        country: 'Bangladesh',
        code: 'BD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bangladesh.png',
        coordinates: [90.356331, 23.684994],
      },
      {
        country: 'Barbados',
        code: 'BB',
        flag: 'https://assets.hackbotone.com/images/flags/flag_barbados.png',
        coordinates: [-59.543198, 13.193887],
      },
      {
        country: 'Belarus',
        code: 'BY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_belarus.png',
        coordinates: [27.953389, 53.709807],
      },
      {
        country: 'Belgium',
        code: 'BE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_belgium.png',
        coordinates: [4.469936, 50.503887],
      },
      {
        country: 'Belize',
        code: 'BZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_belize.png',
        coordinates: [-88.49765, 17.189877],
      },
      {
        country: 'Benin',
        code: 'BJ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_benin.png',
        coordinates: [2.315834, 9.30769],
      },
      {
        country: 'Bhutan',
        code: 'BT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bhutan.png',
        coordinates: [90.433601, 27.514162],
      },
      {
        country: 'Bolivia',
        code: 'BO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bolivia.png',
        coordinates: [-63.588653, -16.290154],
      },
      {
        country: 'Bosnia and Herzegovina',
        code: 'BA',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_bosnia_herzegovina.png',
        coordinates: [17.679076, 43.915886],
      },
      {
        country: 'Botswana',
        code: 'BW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_botswana.png',
        coordinates: [24.684866, -22.328474],
      },
      {
        country: 'Brazil',
        code: 'BR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_brazil.png',
        coordinates: [-51.92528, -14.235004],
      },
      {
        country: 'Brunei',
        code: 'BN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_brunei.png',
        coordinates: [114.727669, 4.535277],
      },
      {
        country: 'Bulgaria',
        code: 'BG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_bulgaria.png',
        coordinates: [25.48583, 42.733883],
      },
      {
        country: 'Burkina Faso',
        code: 'BF',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_burkina_faso.png',
        coordinates: [-1.561593, 12.238333],
      },
      {
        country: 'Burma',
        code: 'MM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_myanmar.png',
        coordinates: [95.956223, 21.913965],
      },
      {
        country: 'Burundi',
        code: 'BI',
        flag: 'https://assets.hackbotone.com/images/flags/flag_burundi.png',
        coordinates: [29.918886, -3.373056],
      },
      {
        country: 'Cabo Verde',
        code: 'CV',
        flag: 'https://assets.hackbotone.com/images/flags/flag_cabo_verde.png',
        coordinates: [-23.0418, 16.5388],
      },
      {
        country: 'Cambodia',
        code: 'KH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_cambodia.png',
        coordinates: [104.990963, 12.565679],
      },
      {
        country: 'Cameroon',
        code: 'CM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_cameroon.png',
        coordinates: [12.354722, 7.369722],
      },
      {
        country: 'Central African Republic',
        code: 'CF',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_central_african_republic.png',
        coordinates: [20.939444, 6.611111],
      },
      {
        country: 'Chad',
        code: 'TD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_chad.png',
        coordinates: [18.732207, 15.454166],
      },
      {
        country: 'Chile',
        code: 'CL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_chile.png',
        coordinates: [-71.542969, -35.675147],
      },
      {
        country: 'Colombia',
        code: 'CO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_colombia.png',
        coordinates: [-74.297333, 4.570868],
      },
      {
        country: 'Congo (Brazzaville)',
        code: 'CG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_congo.png',
        coordinates: [15.2832, -4.2634],
      },
      {
        country: 'Congo (Kinshasa)',
        code: 'CG',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_Congo_democratic_republic.png',
        coordinates: [15.307045, -4.322447],
      },
      {
        country: 'Costa Rica',
        code: 'CR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_costa_rica.png',
        coordinates: [-83.753428, 9.748917],
      },
      {
        country: "Cote d'Ivoire",
        code: 'CI',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_cote_d_Ivoire.png',
        coordinates: [-5.54708, 7.539989],
      },
      {
        country: 'Croatia',
        code: 'HR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_croatia.png',
        coordinates: [15.2, 45.1],
      },
      {
        country: 'Cuba',
        code: 'CU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_cuba.png',
        coordinates: [-77.781167, 21.521757],
      },
      {
        country: 'Cyprus',
        code: 'CY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_cyprus.png',
        coordinates: [33.429859, 35.126413],
      },
      {
        country: 'Czechia',
        code: 'CZ',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_czech_republic.png',
        coordinates: [15.472999999999999, 49.8175],
      },
      {
        country: 'Djibouti',
        code: 'DJ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_djibouti.png',
        coordinates: [42.590275, 11.825138],
      },
      {
        country: 'Dominica',
        code: 'DM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_dominica.png',
        coordinates: [-61.370976, 15.414999],
      },
      {
        country: 'Dominican Republic',
        code: 'DO',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_dominican_republic.png',
        coordinates: [-70.162651, 18.735693],
      },
      {
        country: 'Ecuador',
        code: 'EC',
        flag: 'https://assets.hackbotone.com/images/flags/flag_ecuador.png',
        coordinates: [-78.183406, -1.831239],
      },
      {
        country: 'Egypt',
        code: 'EG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_egypt.png',
        coordinates: [30.802498, 26.820553],
      },
      {
        country: 'El Salvador',
        code: 'SV',
        flag: 'https://assets.hackbotone.com/images/flags/flag_el_salvador.png',
        coordinates: [-88.89653, 13.794185],
      },
      {
        country: 'Equatorial Guinea',
        code: 'GQ',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_equatorial_guinea.png',
        coordinates: [10.267895, 1.650801],
      },
      {
        country: 'Eritrea',
        code: 'ER',
        flag: 'https://assets.hackbotone.com/images/flags/flag_eritrea.png',
        coordinates: [39.782334, 15.179384],
      },
      {
        country: 'Estonia',
        code: 'EE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_estonia.png',
        coordinates: [25.013607, 58.595272],
      },
      {
        country: 'Eswatini',
        code: 'SZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_eswatini.png',
        coordinates: [31.4659, -26.5225],
      },
      {
        country: 'Ethiopia',
        code: 'ET',
        flag: 'https://assets.hackbotone.com/images/flags/flag_ethiopia.png',
        coordinates: [40.489673, 9.145],
      },
      {
        country: 'Fiji',
        code: 'FJ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_fiji.png',
        coordinates: [179.414413, -16.578193],
      },
      {
        country: 'Finland',
        code: 'FI',
        flag: 'https://assets.hackbotone.com/images/flags/flag_finland.png',
        coordinates: [25.748151, 61.92411],
      },
      {
        country: 'Gabon',
        code: 'GA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_gabon.png',
        coordinates: [11.609444, -0.803689],
      },
      {
        country: 'Gambia',
        code: 'GM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_gambia.png',
        coordinates: [-15.310139, 13.443182],
      },
      {
        country: 'Georgia',
        code: 'GE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_georgia.png',
        coordinates: [43.3569, 42.3154],
      },
      {
        country: 'Germany',
        code: 'DE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_germany.png',
        coordinates: [10.451526, 51.165691],
      },
      {
        country: 'Ghana',
        code: 'GH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_ghana.png',
        coordinates: [-1.023194, 7.946527],
      },
      {
        country: 'Greece',
        code: 'GR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_greece.png',
        coordinates: [21.824312, 39.074208],
      },
      {
        country: 'Grenada',
        code: 'GD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_grenada.png',
        coordinates: [-61.604171, 12.262776],
      },
      {
        country: 'Guatemala',
        code: 'GT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_guatemala.png',
        coordinates: [-90.230759, 15.783471],
      },
      {
        country: 'Guinea',
        code: 'GN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_guinea.png',
        coordinates: [-9.6966, 9.9456],
      },
      {
        country: 'Guinea-Bissau',
        code: 'GW',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_guinea_bissau.png',
        coordinates: [-15.180413, 11.803749],
      },
      {
        country: 'Guyana',
        code: 'GY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_guyana.png',
        coordinates: [-58.93018, 4.860416],
      },
      {
        country: 'Haiti',
        code: 'HT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_haiti.png',
        coordinates: [-72.285215, 18.971187],
      },
      {
        country: 'Holy See',
        code: 'VA',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_vatican_city.png',
        coordinates: [12.4534, 41.9029],
      },
      {
        country: 'Honduras',
        code: 'HN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_honduras.png',
        coordinates: [-86.241905, 15.199999],
      },
      {
        country: 'Hungary',
        code: 'HU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_hungary.png',
        coordinates: [19.503304, 47.162494],
      },
      {
        country: 'Iceland',
        code: 'IS',
        flag: 'https://assets.hackbotone.com/images/flags/flag_iceland.png',
        coordinates: [-19.020835, 64.963051],
      },
      {
        country: 'India',
        code: 'IN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_india.png',
        coordinates: [78.96288, 20.593684],
      },
      {
        country: 'Indonesia',
        code: 'ID',
        flag: 'https://assets.hackbotone.com/images/flags/flag_indonesia.png',
        coordinates: [113.921327, -0.789275],
      },
      {
        country: 'Iran',
        code: 'IR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_iran.png',
        coordinates: [53.688046, 32.427908],
      },
      {
        country: 'Iraq',
        code: 'IQ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_iraq.png',
        coordinates: [43.679291, 33.223191],
      },
      {
        country: 'Ireland',
        code: 'IE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_ireland.png',
        coordinates: [-8.24389, 53.41291],
      },
      {
        country: 'Israel',
        code: 'IL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_israel.png',
        coordinates: [34.851612, 31.046051],
      },
      {
        country: 'Italy',
        code: 'IT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_italy.png',
        coordinates: [12.56738, 41.87194],
      },
      {
        country: 'Jamaica',
        code: 'JM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_jamaica.png',
        coordinates: [-77.297508, 18.109581],
      },
      {
        country: 'Japan',
        code: 'JP',
        flag: 'https://assets.hackbotone.com/images/flags/flag_japan.png',
        coordinates: [138.252924, 36.204824],
      },
      {
        country: 'Jordan',
        code: 'JO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_jordan.png',
        coordinates: [36.238414, 30.585164],
      },
      {
        country: 'Kazakhstan',
        code: 'KZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_kazakhstan.png',
        coordinates: [66.923684, 48.019573],
      },
      {
        country: 'Kenya',
        code: 'KE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_kenya.png',
        coordinates: [37.906193, -0.023559],
      },
      {
        country: 'Korea, South',
        code: 'KR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_korea_south.png',
        coordinates: [127.766922, 35.907757],
      },
      {
        country: 'Kosovo',
        code: 'XK',
        flag: 'https://assets.hackbotone.com/images/flags/flag_kosovo.png',
        coordinates: [20.902977, 42.602636],
      },
      {
        country: 'Kuwait',
        code: 'KW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_kuwait.png',
        coordinates: [47.481766, 29.31166],
      },
      {
        country: 'Kyrgyzstan',
        code: 'KG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_kyrgyzstan.png',
        coordinates: [74.766098, 41.20438],
      },
      {
        country: 'Laos',
        code: 'LA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_laos.png',
        coordinates: [102.495496, 19.85627],
      },
      {
        country: 'Latvia',
        code: 'LV',
        flag: 'https://assets.hackbotone.com/images/flags/flag_latvia.png',
        coordinates: [24.603189, 56.879635],
      },
      {
        country: 'Lebanon',
        code: 'LB',
        flag: 'https://assets.hackbotone.com/images/flags/flag_lebanon.png',
        coordinates: [35.862285, 33.854721],
      },
      {
        country: 'Liberia',
        code: 'LR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_liberia.png',
        coordinates: [-9.429499, 6.428055],
      },
      {
        country: 'Libya',
        code: 'LY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_libya.png',
        coordinates: [17.228331, 26.3351],
      },
      {
        country: 'Liechtenstein',
        code: 'LI',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_liechtenstein.png',
        coordinates: [9.555373, 47.166],
      },
      {
        country: 'Lithuania',
        code: 'LT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_lithuania.png',
        coordinates: [23.881275, 55.169438],
      },
      {
        country: 'Luxembourg',
        code: 'LU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_luxembourg.png',
        coordinates: [6.129583, 49.815273],
      },
      {
        country: 'MS Zaandam',
        code: 'NA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_default.png',
        coordinates: [-5.67974, -5.554695],
      },
      {
        country: 'Madagascar',
        code: 'MG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_madagascar.png',
        coordinates: [46.869107, -18.766947],
      },
      {
        country: 'Malawi',
        code: 'MW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_malawi.png',
        coordinates: [34.301525, -13.254308],
      },
      {
        country: 'Malaysia',
        code: 'MY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_malaysia.png',
        coordinates: [101.975766, 4.210484],
      },
      {
        country: 'Maldives',
        code: 'MV',
        flag: 'https://assets.hackbotone.com/images/flags/flag_maldives.png',
        coordinates: [73.22068, 3.202778],
      },
      {
        country: 'Mali',
        code: 'ML',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mali.png',
        coordinates: [-3.996166000000001, 17.570692],
      },
      {
        country: 'Malta',
        code: 'MT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_malta.png',
        coordinates: [14.375416, 35.937496],
      },
      {
        country: 'Mauritania',
        code: 'MR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mauritania.png',
        coordinates: [-10.940835, 21.00789],
      },
      {
        country: 'Mauritius',
        code: 'MU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mauritius.png',
        coordinates: [57.552152, -20.348404],
      },
      {
        country: 'Mexico',
        code: 'MX',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mexico.png',
        coordinates: [-102.552784, 23.634501],
      },
      {
        country: 'Moldova',
        code: 'MD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_moldova.png',
        coordinates: [28.369885, 47.411631],
      },
      {
        country: 'Monaco',
        code: 'MC',
        flag: 'https://assets.hackbotone.com/images/flags/flag_monaco.png',
        coordinates: [7.412841, 43.750298],
      },
      {
        country: 'Mongolia',
        code: 'MN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mongolia.png',
        coordinates: [103.846656, 46.862496],
      },
      {
        country: 'Montenegro',
        code: 'ME',
        flag: 'https://assets.hackbotone.com/images/flags/flag_montenegro.png',
        coordinates: [19.37439, 42.708678],
      },
      {
        country: 'Morocco',
        code: 'MA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_morocco.png',
        coordinates: [-7.09262, 31.791702],
      },
      {
        country: 'Mozambique',
        code: 'MZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_mozambique.png',
        coordinates: [35.529562, -18.665695],
      },
      {
        country: 'Namibia',
        code: 'NA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_namibia.png',
        coordinates: [18.49041, -22.95764],
      },
      {
        country: 'Nepal',
        code: 'NP',
        flag: 'https://assets.hackbotone.com/images/flags/flag_nepal.png',
        coordinates: [84.124008, 28.394857],
      },
      {
        country: 'New Zealand',
        code: 'NZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_new_zealand.png',
        coordinates: [174.885971, -40.900557],
      },
      {
        country: 'Nicaragua',
        code: 'NI',
        flag: 'https://assets.hackbotone.com/images/flags/flag_nicaragua.png',
        coordinates: [-85.207229, 12.865416],
      },
      {
        country: 'Niger',
        code: 'NE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_niger.png',
        coordinates: [8.081666, 17.607789],
      },
      {
        country: 'Nigeria',
        code: 'NG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_nigeria.png',
        coordinates: [8.675277, 9.081999],
      },
      {
        country: 'North Macedonia',
        code: 'MK',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_north_macedonia.png',
        coordinates: [21.745275, 41.608635],
      },
      {
        country: 'Norway',
        code: 'NO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_norway.png',
        coordinates: [8.468946, 60.472024],
      },
      {
        country: 'Oman',
        code: 'OM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_oman.png',
        coordinates: [55.923255, 21.512583],
      },
      {
        country: 'Pakistan',
        code: 'PK',
        flag: 'https://assets.hackbotone.com/images/flags/flag_pakistan.png',
        coordinates: [69.345116, 30.375321],
      },
      {
        country: 'Panama',
        code: 'PA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_panama.png',
        coordinates: [-80.782127, 8.537981],
      },
      {
        country: 'Papua New Guinea',
        code: 'PG',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_papua_new_guinea.png',
        coordinates: [143.95555, -6.314993],
      },
      {
        country: 'Paraguay',
        code: 'PY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_paraguay.png',
        coordinates: [-58.443832, -23.442503],
      },
      {
        country: 'Peru',
        code: 'PE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_peru.png',
        coordinates: [-75.015152, -9.189967],
      },
      {
        country: 'Philippines',
        code: 'PH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_philippines.png',
        coordinates: [121.774017, 12.879721],
      },
      {
        country: 'Poland',
        code: 'PL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_poland.png',
        coordinates: [19.145136, 51.919438],
      },
      {
        country: 'Portugal',
        code: 'PT',
        flag: 'https://assets.hackbotone.com/images/flags/flag_portugal.png',
        coordinates: [-8.224454, 39.399872],
      },
      {
        country: 'Qatar',
        code: 'QA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_qatar.png',
        coordinates: [51.183884, 25.354826],
      },
      {
        country: 'Romania',
        code: 'RO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_romania.png',
        coordinates: [24.96676, 45.943161],
      },
      {
        country: 'Russia',
        code: 'RU',
        flag: 'https://assets.hackbotone.com/images/flags/flag_russia.png',
        coordinates: [105.318756, 61.52401],
      },
      {
        country: 'Rwanda',
        code: 'RW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_rwanda.png',
        coordinates: [29.873888, -1.940278],
      },
      {
        country: 'Saint Kitts and Nevis',
        code: 'KN',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_st_kitts_nevis.png',
        coordinates: [-62.782998, 17.357822],
      },
      {
        country: 'Saint Lucia',
        code: 'LC',
        flag: 'https://assets.hackbotone.com/images/flags/flag_st_lucia.png',
        coordinates: [-60.978893, 13.909444],
      },
      {
        country: 'Saint Vincent and the Grenadines',
        code: 'VC',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_st_vincent_the_grenadines.png',
        coordinates: [-61.287228, 12.984305],
      },
      {
        country: 'San Marino',
        code: 'SM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_san_marino.png',
        coordinates: [12.457777, 43.94236],
      },
      {
        country: 'Saudi Arabia',
        code: 'SA',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_saudi_arabia.png',
        coordinates: [45.079162, 23.885942],
      },
      {
        country: 'Senegal',
        code: 'SN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_senegal.png',
        coordinates: [-14.452362, 14.497401],
      },
      {
        country: 'Serbia',
        code: 'RS',
        flag: 'https://assets.hackbotone.com/images/flags/flag_serbia.png',
        coordinates: [21.005859, 44.016521],
      },
      {
        country: 'Seychelles',
        code: 'SC',
        flag: 'https://assets.hackbotone.com/images/flags/flag_seychelles.png',
        coordinates: [55.491977, -4.679574],
      },
      {
        country: 'Sierra Leone',
        code: 'SL',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_sierra_leone.png',
        coordinates: [-11.779889, 8.460555],
      },
      {
        country: 'Singapore',
        code: 'SG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_singapore.png',
        coordinates: [103.819836, 1.352083],
      },
      {
        country: 'Slovakia',
        code: 'SK',
        flag: 'https://assets.hackbotone.com/images/flags/flag_slovakia.png',
        coordinates: [19.699024, 48.669026],
      },
      {
        country: 'Slovenia',
        code: 'SI',
        flag: 'https://assets.hackbotone.com/images/flags/flag_slovenia.png',
        coordinates: [14.995463, 46.151241],
      },
      {
        country: 'Somalia',
        code: 'SO',
        flag: 'https://assets.hackbotone.com/images/flags/flag_somalia.png',
        coordinates: [46.199616, 5.152149],
      },
      {
        country: 'South Africa',
        code: 'ZA',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_south_africa.png',
        coordinates: [22.937506, -30.559482],
      },
      {
        country: 'Spain',
        code: 'ES',
        flag: 'https://assets.hackbotone.com/images/flags/flag_spain.png',
        coordinates: [-3.74922, 40.463667],
      },
      {
        country: 'Sri Lanka',
        code: 'LK',
        flag: 'https://assets.hackbotone.com/images/flags/flag_sri_lanka.png',
        coordinates: [80.771797, 7.873054],
      },
      {
        country: 'Sudan',
        code: 'SD',
        flag: 'https://assets.hackbotone.com/images/flags/flag_sudan.png',
        coordinates: [30.217636, 12.862807],
      },
      {
        country: 'Suriname',
        code: 'SR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_suriname.png',
        coordinates: [-56.027783, 3.919305],
      },
      {
        country: 'Sweden',
        code: 'SE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_sweden.png',
        coordinates: [18.643501, 60.128161],
      },
      {
        country: 'Switzerland',
        code: 'CH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_switzerland.png',
        coordinates: [8.227512, 46.818188],
      },
      {
        country: 'Syria',
        code: 'SY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_syria.png',
        coordinates: [38.996815, 34.802075],
      },
      {
        country: 'Taiwan*',
        code: 'TW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_taiwan.png',
        coordinates: [120.960515, 23.69781],
      },
      {
        country: 'Tanzania',
        code: 'TZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_tanzania.png',
        coordinates: [34.888822, -6.369028],
      },
      {
        country: 'Thailand',
        code: 'TH',
        flag: 'https://assets.hackbotone.com/images/flags/flag_thailand.png',
        coordinates: [100.992541, 15.870032],
      },
      {
        country: 'Timor-Leste',
        code: 'TL',
        flag: 'https://assets.hackbotone.com/images/flags/flag_timor-leste.png',
        coordinates: [125.727539, -8.874217],
      },
      {
        country: 'Togo',
        code: 'TG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_togo.png',
        coordinates: [0.824782, 8.619543],
      },
      {
        country: 'Trinidad and Tobago',
        code: 'TT',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_trinidad_tobago.png',
        coordinates: [-61.222503, 10.691803],
      },
      {
        country: 'Tunisia',
        code: 'TN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_tunisia.png',
        coordinates: [9.537499, 33.886917],
      },
      {
        country: 'Turkey',
        code: 'TR',
        flag: 'https://assets.hackbotone.com/images/flags/flag_turkey.png',
        coordinates: [35.243322, 38.963745],
      },
      {
        country: 'Uganda',
        code: 'UG',
        flag: 'https://assets.hackbotone.com/images/flags/flag_uganda.png',
        coordinates: [32.290275, 1.373333],
      },
      {
        country: 'Ukraine',
        code: 'UA',
        flag: 'https://assets.hackbotone.com/images/flags/flag_ukraine.png',
        coordinates: [31.16558, 48.379433],
      },
      {
        country: 'United Arab Emirates',
        code: 'AE',
        flag:
          'https://assets.hackbotone.com/images/flags/flag_united_arab_emirates.png',
        coordinates: [53.847818, 23.424076],
      },
      {
        country: 'Uruguay',
        code: 'UY',
        flag: 'https://assets.hackbotone.com/images/flags/flag_uruguay.png',
        coordinates: [-55.765835, -32.522779],
      },
      {
        country: 'Uzbekistan',
        code: 'UZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_uzbekistan.png',
        coordinates: [64.585262, 41.377491],
      },
      {
        country: 'Venezuela',
        code: 'VE',
        flag: 'https://assets.hackbotone.com/images/flags/flag_venezuela.png',
        coordinates: [-66.58973, 6.42375],
      },
      {
        country: 'Vietnam',
        code: 'VN',
        flag: 'https://assets.hackbotone.com/images/flags/flag_vietnam.png',
        coordinates: [108.277199, 14.058324],
      },
      {
        country: 'West Bank and Gaza',
        code: 'GZ',
        flag: 'https://assets.hackbotone.com/images/flags/flag_palestine.png',
        coordinates: [35.2332, 31.9522],
      },
      {
        country: 'Zambia',
        code: 'ZM',
        flag: 'https://assets.hackbotone.com/images/flags/flag_zambia.png',
        coordinates: [27.849332, -13.133897],
      },
      {
        country: 'Zimbabwe',
        code: 'ZW',
        flag: 'https://assets.hackbotone.com/images/flags/flag_zimbabwe.png',
        coordinates: [29.154857, -19.015438],
      },
    ];
    if (country.length < 3) {
      let nec: string;
      countries.forEach((cou) => {
        if (cou.code == country) {
          nec = cou.country;
          console.log('NEC', nec);
        }
        return;
      });
      return this.http
        .get(`https://ncovid19api.herokuapp.com/timeline/${nec}`)
        .pipe(
          map((result) => {
            console.log('Result');

            console.log(result);

            return result;
          })
        );
    } else {
      return this.http
        .get(`https://ncovid19api.herokuapp.com/timeline/${country}`)
        .pipe(
          map((result) => {
            console.log(result);

            return result;
          })
        );
    }
  }
}
