export interface Data {
  id: string;
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
  last_date_updated: string;
  country_statistics: Array<Text>
}
