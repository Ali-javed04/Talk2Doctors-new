import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportGenerationRoutingModule } from './report-generation-routing.module';
import { ReportGenerationComponent } from './report-generation.component';


@NgModule({
  declarations: [
    ReportGenerationComponent
  ],
  imports: [
    CommonModule,
    ReportGenerationRoutingModule
  ]
})
export class ReportGenerationModule { }
