import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-temprature',
  templateUrl: './add-temprature.component.html',
  styleUrls: ['./add-temprature.component.css']
})
export class AddTempratureComponent implements OnInit {
  @Output() addWeatherData: EventEmitter<any> = new EventEmitter()
  inputValue;
  inputDate;
  
  constructor() { }

  ngOnInit() {
  }

  addTemperature()
  {
    const tempData = {
      type: "temperature",
      time: this.inputDate,
      place: "Aarhus",
      value: this.inputValue,
      unit: "C"
    }
    console.log(tempData)

    this.addWeatherData.emit(tempData);
  }
}
