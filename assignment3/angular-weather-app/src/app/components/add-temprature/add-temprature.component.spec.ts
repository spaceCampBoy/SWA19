import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTempratureComponent } from './add-temprature.component';

describe('AddTempratureComponent', () => {
  let component: AddTempratureComponent;
  let fixture: ComponentFixture<AddTempratureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTempratureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTempratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
