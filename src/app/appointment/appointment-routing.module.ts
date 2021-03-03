import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDashboardComponent } from '../appointment-dashboard/appointment-dashboard.component';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),   CommonModule  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
