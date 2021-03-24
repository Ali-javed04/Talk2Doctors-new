import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TakeAppointmentRoutingModule } from './take-appointment-routing.module';
import { TakeAppointmentComponent } from './take-appointment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TakeAppointmentComponent
  ],
  imports: [
    CommonModule,
    TakeAppointmentRoutingModule,
    FormsModule
  ]
})
export class TakeAppointmentModule { }
