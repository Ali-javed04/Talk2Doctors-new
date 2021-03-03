import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentDashboardRoutingModule } from './appointment-dashboard-routing.module';
import { AppointmentDashboardComponent } from './appointment-dashboard.component';
import { PendingAppointmentComponent } from './pending-appointment/pending-appointment.component';
import { CompleteAppointmentComponent } from './complete-appointment/complete-appointment.component';
import { ApprovedAppointmentComponent } from './approved-appointment/approved-appointment.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppointmentDashboardComponent,
    PendingAppointmentComponent,
    CompleteAppointmentComponent,
    ApprovedAppointmentComponent,
    CancelAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentDashboardRoutingModule,
    FormsModule
  ]
})
export class AppointmentDashboardModule { }
