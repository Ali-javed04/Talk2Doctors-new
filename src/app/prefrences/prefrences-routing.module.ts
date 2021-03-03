import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefrencesComponent } from './prefrences.component';

const routes: Routes = [
  {
    path: '', component: PrefrencesComponent, children: [
      {
        path: 'prefrence', component: PrefrencesComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefrencesRoutingModule { }
