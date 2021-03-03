import { Injectable } from '@angular/core';
import { IIsProfileCompletedRequest, IIsProfileCompletedResponse, IUserToken } from '../interfaces/appInterface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
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

  }
