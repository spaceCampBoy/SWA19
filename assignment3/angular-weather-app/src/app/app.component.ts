import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './components/model/WeatherModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-weather-app';
  model = new WeatherData();
  queryData = this.model.getData();

  constructor(private weatherService: WeatherService) {
    this.weatherService.fetchWeather("data").subscribe(data => {
      this.model.includingHistoric(data);
    });
    this.weatherService.fetchWeather("forecast").subscribe(data => {
      this.model.includingForecast(data)
    });
  }

  addWeatherData(data){
    this.weatherService.postWeatherData(data).subscribe(res => 
      {
        this.model.includingHistoric([data]);
        this.queryData = this.model.getData();
      });
  }

  queryWeatherData(params)
  {
    params.from = this.validateDate(params.from)
    params.to = this.validateDate(params.to)
    
    this.model.forType(params.type)
    this.model.forPlace(params.city)
    this.model.forFrom(params.from)
    this.model.forTo(params.to)
    this.queryData = this.model.getData()
  }

  private validateDate(date)
  {
    if(date)
    {
      date = new Date(date)
      date.setHours(0,0,0,0)
    }
    else{
      date = new Date()
    }
    return date;
  }
}
