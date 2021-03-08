import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIdentityBasicInfo ,IGetProfileResponse,IProfileData, IVerifyAccount, IVerificationCode, ILookupItem} from '../../app/interfaces/appInterface'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
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
  public returnList: ((index: any) => any) & _.MemoizedFunction
  public apiPath: string = 'lookuplists/generic'
  public _data: any = undefined


  constructor( private httpClient: HttpClient,private router: Router) { }

  public getAuthenticationToken(data): Promise<any> {
     const data1 ={
      email:data.email,
      password:data.password
    }
    const option = {
      withCredentials: true
    }
    return this.httpClient.post(`${this.host}${this.urls.authenticationTokenPath}`, data1).toPromise()
  }
  public getIdentityProfile(): Promise<IGetProfileResponse> {
    return this.httpClient.get<IGetProfileResponse>(`${this.host}${this.urls.identityProfile}`).toPromise()
}
public saveUserSocialAccountInfo(socialusers): Promise<any> {
  const request: IIdentityBasicInfo = {
    email: socialusers.email,
    firstname: socialusers.firstName,
    lastname: socialusers.lastName,
    providerKey: socialusers.id,
    loginProviderName: socialusers.provider,
    profilePicturePath: socialusers.photoUrl,
    profilePictureTitle: socialusers.name,
    isActive: true
  }
  return this.httpClient.post(`${this.host}${this.urls.loginViaAuthService}`,request).toPromise()
}



public logout(): any {

    if (localStorage.getItem('authenticatedByLoginToken')) {
      return this.httpClient.delete(`${this.host}${this.urls.deleteSessionPath}`).subscribe(result=>{
        this.redirectToLogin()
      },
      error=>{
        this.redirectToLogin()
      })
  }
    }
public redirectToLogin(): void {
  const localStorageItemsToRemove = [
    'authenticatedByLoginToken',
    'userData',
  ]
  localStorageItemsToRemove.forEach(item => localStorage.removeItem(item))
  this.router.navigateByUrl('/login')
}
public updateRole(userId: number, role: number): Promise<any> {
  var abc = 'default'
  return this.httpClient.post(`${this.host}${this.urls.updaterole}?role=${role}&identityId=${userId}`,abc).toPromise()

}
public verifyAccount(request: IVerifyAccount): Observable<IVerifyAccount> {
  return this.httpClient
    .post<IVerifyAccount>(`${this.host}${this.urls.verifyAccount}`, request)

}
public sendVerificationCode(request: IVerificationCode): Promise<IVerificationCode> {
  return this.httpClient
    .post<IVerificationCode>(`${this.host}${this.urls.verificationCode}`, request)
    .toPromise()
}
public register(request: any): any {
  return this.httpClient
    .post<any>(`${this.host}${this.urls.register}`, request)
    .toPromise()
}
public getNameValue<T extends ILookupItem>(lookupList: T[], lookupIndex: number, defaultIfNotFound?: string): string {
  const match = this.getLookupItemByLookup(lookupList, lookupIndex)
  if (!_.isEmpty(match)) {
    return match.name
  }

}
public getLookupItemByLookup<T extends ILookupItem>(lookups: T[], lookupIndex: number): T {
  return _.find(lookups, lookup => lookup.lookupIndex === lookupIndex);
}

}
