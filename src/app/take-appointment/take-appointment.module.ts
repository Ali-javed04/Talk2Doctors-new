import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TakeAppointmentRoutingModule } from './take-appointment-routing.module';
import { TakeAppointmentComponent } from './take-appointment.component';


@NgModule({
  declarations: [
    TakeAppointmentComponent
  ],
  imports: [
    CommonModule,
    TakeAppointmentRoutingModule
  ]
})
export class TakeAppointmentModule { }
