import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeAppointmentComponent } from './take-appointment.component';

const routes: Routes = [
  {
    path:'', component: TakeAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeAppointmentRoutingModule { }
