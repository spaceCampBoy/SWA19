import { Component, OnInit , Input} from '@angular/core';
import { WeatherData } from '../model/WeatherModel';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  @Input() queryData;
  constructor() { }

  ngOnInit() {
  }


}
