import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefrencesRoutingModule } from './prefrences-routing.module';
import { PrefrencesComponent } from './prefrences.component';


@NgModule({
  declarations: [
    PrefrencesComponent
  ],
  imports: [
    CommonModule,
    PrefrencesRoutingModule
  ]
})
export class PrefrencesModule { }
