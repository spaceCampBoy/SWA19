import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-row',
  templateUrl: './weather-row.component.html',
  styleUrls: ['./weather-row.component.css']
})
export class WeatherRowComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
