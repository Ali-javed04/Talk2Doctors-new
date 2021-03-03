import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDoctorRoutingModule } from './search-doctor-routing.module';
import { SearchDoctorComponent } from './search-doctor.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchDoctorComponent
  ],
  imports: [
    CommonModule,
    SearchDoctorRoutingModule,
    FormsModule

  ]
})
export class SearchDoctorModule { }
