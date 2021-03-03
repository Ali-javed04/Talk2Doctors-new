import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppointmentComponent,

  ],
  imports: [
    CommonModule,
    FormsModule

  ]
})
export class AppointmentModule { }
