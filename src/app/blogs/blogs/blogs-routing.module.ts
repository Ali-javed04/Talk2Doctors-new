import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from '../blogs.component';

const routes: Routes = [
  {
    path: '', component: BlogsComponent, children: [
      {
        path: 'blog', component: BlogsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
