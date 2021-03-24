import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctorDegreeData, IDoctorSpecialityData } from '../interfaces/appInterface';

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
public updateDoctorDetail(doctorId: number, request: any) {
  const doctordata1 = {doctorData:request}
  return this.httpClient.put(`${this.host}doctor/${doctorId}/updateDetail`, doctordata1)
}

public updateDoctorSpeciality(doctorSpecialty: IDoctorSpecialityData): Promise<{}> {
  const request = {
    doctorSpecialityData:doctorSpecialty
  }

  return this.httpClient.put<IDoctorSpecialityData>(`${this.host}doctor/speciality/${doctorSpecialty.xrefDoctorSpecialityID}/update`,request ).toPromise()
}

public updateDoctorDegree(doctorDegree: IDoctorDegreeData): Promise<{}> {
  const request =  {doctorDegreeData:doctorDegree}
  return this.httpClient.put<IDoctorDegreeData>(`${this.host}doctor/degree/${doctorDegree.xrefDoctorDegreeID}/update`,request ).toPromise()

}
public createDoctorSpeciality(request: IDoctorSpecialityData){
  const request1 = {doctorSpecialityData: request}
  return this.httpClient.post<IDoctorSpecialityData>(`${this.host}doctor/createSpeciality`,request1)
}

public createDoctorDegree(request: IDoctorDegreeData) {
  const request1 = {doctorDegreeData: request }
  return this.httpClient.post(this.host + 'doctor/createDegree',request1)
}

public getDoctorSpecialities(doctorId: number): Promise <IDoctorSpecialityData> {
  return this.httpClient.get<IDoctorSpecialityData>(`${this.host}doctor/${doctorId}/specialities`).toPromise()
}
public deleteDoctorSpeciality(xrefDoctorSpecialityID: number, doctorId: number): Promise<{}> {
  return this.httpClient.delete(

     `${this.host}doctor/speciality/${xrefDoctorSpecialityID}/${doctorId}/delete`
  ).toPromise()
}

public deleteDoctorDegree(doctorDegreeId: number, doctorId: number): Promise<{}> {
  return this.httpClient.delete(

     `${this.host}doctor/degree/${doctorDegreeId}/${doctorId}/delete`
  ).toPromise()
}
public getDoctorDegrees(doctorId: number): Promise <IDoctorDegreeData> {
  return this.httpClient.get<IDoctorDegreeData>(`${this.host}doctor/${doctorId}/degrees`).toPromise()

}
}

