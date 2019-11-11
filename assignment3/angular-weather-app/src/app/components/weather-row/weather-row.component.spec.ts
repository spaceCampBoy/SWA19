import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherRowComponent } from './weather-row.component';

describe('WeatherRowComponent', () => {
  let component: WeatherRowComponent;
  let fixture: ComponentFixture<WeatherRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
