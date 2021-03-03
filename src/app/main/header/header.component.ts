import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { IdentityService } from 'src/app/Services/identity.service';
import { IdentityType } from '../../enums/enums'
import { IProfileData } from 'src/app/interfaces/appInterface';
import { AuthenticationService } from 'src/app/Services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public isDropdownOpen = false;
  currenturl: string = '';
  public IdentityType = IdentityType

  constructor (private router:Router,
    private location: Location,
    private IdentityService: IdentityService,
    private authenticationService: AuthenticationService
    ) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
   if(event.url =='/') {
        this.currenturl = 'home'
      }else {
        this.currenturl = event.url
      }
    });
  }
  currentState(url:string): boolean {
    return this.currenturl.includes(url)
   }

  openDropDown(event: Event) {
      this.isDropdownOpen = true;
  }
  closeDropDown(event: Event) {
    this.isDropdownOpen = false;
  }
  public get identityTypeLookup(): number {
    const profileData = JSON.parse(localStorage.getItem('userData'))
    if(profileData) {
      return profileData.identityTypeLookup
    }
  }
  public get hasValidAuthenticationToken(): boolean {
    return this.IdentityService.hasValidAuthenticationToken()
  }
  public get getProfilePhoto(): any {
    if (_.isNil(this.identity.profilePicture)) {
      return '/assets/register.png';
    }
    return `data:image/jpeg;base64,${this.identity.profilePicture}`
  }
  public get identity(): IProfileData {
    if (this.hasValidAuthenticationToken) {
      return JSON.parse(localStorage.getItem('userData'))
    }
  }
  public onLogOutClick(): void {
    this.authenticationService.logout()
  }

}



