import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  host  = 'http://localhost:63752/api/v1/';

  urls = {

 }

  constructor(private httpClient: HttpClient) { }
  public loadDiagnosis(doctorId: number):Promise<any> {

    return this.httpClient.get<any>(`${this.host}doctor/${doctorId}/getdiagnosispreferences`).toPromise()

  }
  public loadPrescriptions(doctorId: number): Promise <any>{

    return this.httpClient.get<any>(

       `${this.host}doctor/getdoctormedicationpreference/${doctorId}`
    ).toPromise()

  }

  public getDagnosisMedication(doctorId: number): Promise <any>{

    return this.httpClient.get(`${this.host}doctor/${doctorId}/getdiagnosismedication`).toPromise()


}
}

