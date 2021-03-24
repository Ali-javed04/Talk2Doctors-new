import { Injectable } from '@angular/core';
import { IAddIdentityPhotosRequest, IAddIdentityPhotosResponse, IGetIdentityPhotoResponse, IGetIdentityPhotosResponse, IGetProfileResponse, IIdentityPhoto, IIsProfileCompletedRequest, IIsProfileCompletedResponse, IUpdatePersonalDetailRequest, IUserToken } from '../interfaces/appInterface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  host  = 'http://localhost:63752/api/v1/';

  private cachedTokenWhichWasDecoded: string = ''
  private cachedDecodedToken: IUserToken | null = null
  public  jwtHelper = new JwtHelperService();


  constructor(private httpClient: HttpClient) { }

  public decodeToken(): IUserToken | Partial<IUserToken> {
    const token = localStorage.getItem('authenticatedByLoginToken')
    if (!token) {
      return {}
    }
    if (token !== this.cachedTokenWhichWasDecoded) {
      this.cachedTokenWhichWasDecoded = token
      this.cachedDecodedToken = this.jwtHelper.decodeToken(token)
    }
    return this.cachedDecodedToken
  }

  public getActiveIdentityId(): number {
    const userId = this.decodeToken().IdentityDbId
    if (userId) {
      return Number.parseInt(userId)
    }
    throw Error('No user is active')
  }

  public getActiveDoctorId(): number {
    const profileData = JSON.parse(localStorage.getItem('userData'))
    if (profileData) {
      return profileData.doctorID
    }
  }
  public isProfileComplete(request: IIsProfileCompletedRequest): Promise<IIsProfileCompletedResponse> {
    return this.httpClient.get<IIsProfileCompletedResponse>( `${this.host}identity/isprofilecompleted?identityId=${request.identityId}&isDoctor=${request.isDoctor}&isPatient=${request.isPatient}&isVisitor=${request.isVisitor}`).toPromise()

}
public hasValidAuthenticationToken(): boolean {
  try {
    const authenticationToken = localStorage.getItem('authenticatedByLoginToken')
    return authenticationToken !== null
  } catch (err) {
    return false
  }
}

public addPhoto(request: any): Promise<any> {
  return this.httpClient.post<any>(`${this.host}identity/photo/add`, request).toPromise()
}

public getPhoto(identityId: number): Promise<IGetIdentityPhotoResponse> {
  return this.httpClient.get<IGetIdentityPhotoResponse>(`${this.host}identity/${identityId}/photo`)
    .toPromise()
}

public getPhotos(identityId: number): Promise<IGetIdentityPhotosResponse> {
  return this.httpClient.get<IGetIdentityPhotosResponse>(`${this.host}identity/${identityId}/photos`).toPromise()
}

public updatePhoto(identityId: number, request: IIdentityPhoto) {
  return this.httpClient.put(
`${this.host}identity/${identityId}/photo/update`,request)
 }
 public getProfileByIdentityId(identityId: number): Observable<IGetProfileResponse> {
  return this.httpClient.get<IGetProfileResponse>(
    `${this.host}identity/${identityId}/profile`
  )
}
public updatePersonalDetail(identityId: number, request: IUpdatePersonalDetailRequest) {
  return this.httpClient.put(`${this.host}identity/${identityId}/update`,request)
}


  }
