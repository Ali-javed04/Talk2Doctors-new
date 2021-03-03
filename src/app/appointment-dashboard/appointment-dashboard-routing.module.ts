import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDashboardComponent } from './appointment-dashboard.component';
import { ApprovedAppointmentComponent } from './approved-appointment/approved-appointment.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { CompleteAppointmentComponent } from './complete-appointment/complete-appointment.component';
import { PendingAppointmentComponent } from './pending-appointment/pending-appointment.component';

const routes: Routes = [
  {
    path: '', component: AppointmentDashboardComponent, children: [
      // {
      //   path: 'pending,', component: PendingAppointmentComponent
      // },
      // {
      //   path: 'approved', component: ApprovedAppointmentComponent
      // },
      // {
      //   path: 'cancel', component: CancelAppointmentComponent
      // },
      // {
      //   path: 'complete', component: CompleteAppointmentComponent
      // }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentDashboardRoutingModule {
  constructor() {
    console.log("appointment dashboard component")
  }
 }
