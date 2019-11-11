import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import { QueryPanelComponent } from './components/query-panel/query-panel.component';
import { AddTempratureComponent } from './components/add-temprature/add-temprature.component';
import { WeatherRowComponent } from './components/weather-row/weather-row.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDataComponent,
    QueryPanelComponent,
    AddTempratureComponent,
    WeatherRowComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
