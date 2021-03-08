import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 { path:'', component:HomeComponent },
 { path: 'survey', loadChildren: () => import(`./surveys/surveys.module`).then(m => m.SurveysModule) },
 { path: 'blog', loadChildren: () => import(`./blogs/blogs/blogs.module`).then(m => m.BlogsModule) },
 { path: 'contact', loadChildren: () => import(`./contact/contact.module`).then(m => m.ContactModule) },
 { path: 'login', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule) },
 { path: 'prefrence', loadChildren: () => import(`./prefrences/prefrences.module`).then(m => m.PrefrencesModule) },
 { path: 'appointment', loadChildren: () => import(`./appointment-dashboard/appointment-dashboard.module`).then(m => m.AppointmentDashboardModule) },
 { path: 'profile/:identityId', loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule) },
 { path:'search',loadChildren:() => import(`./search-doctor/search-doctor.module`).then(m => m.SearchDoctorModule)},
 { path:'take-appointment/:medicalRecordId',loadChildren:() => import(`./take-appointment/take-appointment.module`).then(m => m.TakeAppointmentModule)},
 { path: '', component: HomeComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log("app module loaded")
  }
 }
