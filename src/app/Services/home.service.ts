import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICountSpecility, ITopRatedDoctors } from '../interfaces/appInterface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  host  = 'http://localhost:63752/api/v1/';
  urls = {
    doctorsList: 'doctor/homepage',

  }
  constructor( private httpClient: HttpClient,private router: Router) { }
  public getDoctorsList(query: string = ''): Promise<{doctorsList: ITopRatedDoctors[];countDoctorBySpeciality: ICountSpecility[]}> {
    return this.httpClient.get<{doctorsList: ITopRatedDoctors[];countDoctorBySpeciality: ICountSpecility[]}>(
       `${this.host}${this.urls.doctorsList}${query}`
    ).toPromise()
  }

}
