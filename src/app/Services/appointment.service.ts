import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIdentityBasicInfo ,IGetProfileResponse,IProfileData, IVerifyAccount, IVerificationCode, IDoctorAppointmentHistoryData, IPatientAppointmentHistoryData, IMedicalRecordResponse, IUpdateDoctorDashboardAppointmentRequest} from '../../app/interfaces/appInterface'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  host  = 'http://localhost:63752/api/v1/';

  urls = {
   authenticationTokenPath: 'authentication/token',
   identityProfile:'identity/profile',
   loginViaAuthService: 'authentication/authServiceLogin',
   deleteSessionPath: 'session',
   updaterole: 'authentication/updaterole',
   verifyAccount: 'identity/verifyAccount',
   verificationCode: 'authentication/sendVerificationCode',
   register: 'identity/register',
 }
 constructor( private httpClient: HttpClient,private router: Router) { }

 public getDoctorAppointmentHistories(identityId: number): Promise<{
  items: any[]
  count: number
}> {
  return this.httpClient.get<{
    items: any[]
    count: number
  }>(`${this.host}appointment/doctor/${identityId}/appointments`).toPromise()

}

public getPatientAppointmentHistories(identityId: number, query: string = ''): Promise<{
  items: IPatientAppointmentHistoryData[]
  count: number
}>
{
  return this.httpClient.get<{
    items: IPatientAppointmentHistoryData[]
    count: number
  }>(`${this.host}appointment/patient/${identityId}/histories` + query).toPromise()

}
public getappointmentDetail(medicalRecordId: number): Promise<IMedicalRecordResponse> {
  return this.httpClient.get<IMedicalRecordResponse>( `${this.host}medicalrecord/${medicalRecordId}`).toPromise()
}
public updateDoctorDashboardAppointment(request: IUpdateDoctorDashboardAppointmentRequest):Promise<any> {
  return this.httpClient.put(`${this.host}appointment/updateAppointment`,request).toPromise()

}
}
