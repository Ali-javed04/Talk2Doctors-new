import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppModule } from '../app.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgScrollbarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1CaF3uz9Mv27pssBj4l-j5jc_-AQLrdU'
    })

  ]
})
export class ProfileModule { }
