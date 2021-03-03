import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerconfigserviceService {
  host  = 'http://localhost:63752/api/v1/';
  urls = {
     apiPath: 'lookuplists/generic'
  }


  constructor(private httpClient: HttpClient){ }

  public getEnglishLookupList(): any {
    const data = this.httpClient.get(`${this.host}${this.urls.apiPath}/en-us`).subscribe(result=>{
      localStorage.setItem('LookupList', JSON.stringify(result))
    },
    error=>{console.log("error",error)})
    return data
  }

}
