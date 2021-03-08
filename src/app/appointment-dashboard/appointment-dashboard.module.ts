import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentDashboardRoutingModule } from './appointment-dashboard-routing.module';
import { AppointmentDashboardComponent } from './appointment-dashboard.component';
import { PendingAppointmentComponent } from './pending-appointment/pending-appointment.component';
import { CompleteAppointmentComponent } from './complete-appointment/complete-appointment.component';
import { ApprovedAppointmentComponent } from './approved-appointment/approved-appointment.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    AppointmentDashboardComponent,
    PendingAppointmentComponent,
    CompleteAppointmentComponent,
    ApprovedAppointmentComponent,
    CancelAppointmentComponent,
    // ModalComponent,
  ],
  imports: [
    CommonModule,
    AppointmentDashboardRoutingModule,
    FormsModule,
    NgxUiLoaderModule,
  ]
})
export class AppointmentDashboardModule { }
