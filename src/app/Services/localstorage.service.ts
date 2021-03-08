import { Injectable } from '@angular/core';
import { IProfileData } from '../interfaces/appInterface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {


  constructor() { }

  public set lookupValue(role:number) {
    let Userdata = JSON.parse(localStorage.getItem('userData'));
    Userdata.identityTypeLookup = role
    this.userData = Userdata;
  }

  public set userData(data:IProfileData){
    localStorage.setItem('userData', JSON.stringify(data));
  }
  public set IsActive(data:boolean) {
    let Userdata = JSON.parse(localStorage.getItem('userData'));
    Userdata.identityTypeLookup = data
    this.userData = Userdata;
  }


}
