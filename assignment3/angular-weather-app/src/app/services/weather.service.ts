import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    "Content-Type": "application/json",
    "Accept": "application/json" 
  })
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http:HttpClient) { }
  
  fetchWeather(historicOrForecast):Observable<any> {
    return this.http.get(`http://localhost:8080/${historicOrForecast}`);
  }
  
  postWeatherData(data: any):Observable<any> {
    return this.http.post('http://localhost:8080/data', [data], httpOptions)
  }
}
