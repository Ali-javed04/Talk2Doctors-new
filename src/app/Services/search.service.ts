import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountSpecility, ITopRatedDoctors } from '../interfaces/appInterface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  host  = 'http://localhost:63752/api/v1/';

  urls = {
    doctorsList: 'doctor/homepage',

 }

  constructor(private httpClient: HttpClient) { }

  public getDoctorsList(query: string = ''): Promise<{doctorsList: ITopRatedDoctors[];countDoctorBySpeciality: ICountSpecility[]}> {
    return this.httpClient.get<{doctorsList: ITopRatedDoctors[];countDoctorBySpeciality: ICountSpecility[]}>(`${this.host}${this.urls.doctorsList}${query}`).toPromise()
  }

}
