import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteAppointmentComponent } from './complete-appointment.component';

describe('CompleteAppointmentComponent', () => {
  let component: CompleteAppointmentComponent;
  let fixture: ComponentFixture<CompleteAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
