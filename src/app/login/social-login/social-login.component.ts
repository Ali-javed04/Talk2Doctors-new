import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IdentityType } from 'src/app/enums/enums';
import { IGetProfileResponse, IIsProfileCompletedRequest } from 'src/app/interfaces/appInterface';
import { ModalComponent } from 'src/app/modal/modal.component';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IdentityService } from 'src/app/Services/identity.service';
import { LocalstorageService } from 'src/app/Services/localstorage.service';
import { ModalConfig } from '../../modal/modalconfig'



@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  public modalConfig :ModalConfig = {
    modalTitle: "Please Select the Role Before Login",
    dismissButtonLabel: "close",
    closeButtonLabel: "close"
  }
   public role : number ;

  @ViewChild('modal') private modalComponent: ModalComponent
  constructor(private authService: SocialAuthService ,
     private toaster: ToastrService,
     private authenticationService:AuthenticationService,
      private router: Router,
      private identityService: IdentityService,
      private localStorageService: LocalstorageService,
      private ngxService: NgxUiLoaderService
      ) { }
  ngOnInit(): void {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
      this.ngxService.start()
     this.authenticationService.saveUserSocialAccountInfo(socialusers)
     .then(response => {
      const authenticationToken = response.token
      if (!authenticationToken) {
        return
      }
      localStorage.setItem('authenticatedByLoginToken', authenticationToken)
      this.authenticationService.getIdentityProfile().then((identityResponse:IGetProfileResponse)=>{
        if (_.isNil(identityResponse.profileData.identityTypeLookup) || !identityResponse.profileData.identityTypeLookup) {
          this.ngxService.stop()
          this.openModal()
            .then(() =>{
              this.ngxService.start()
              this.selectedRole()
              this.processIdentityResponse(identityResponse)
              this.localStorageService.lookupValue = this.role;
              this.ngxService.stop()
              this.router.navigateByUrl('/home')
              this.toaster.success(`Hello${socialusers.name}`, 'You are Login Scuccesfully');

            })
            .catch(() => {
              this.authenticationService.logout()
              this.router.navigateByUrl('/login')
              this.toaster.error("You Cannot LoginIn Without Selecting Role ",'Please Try Again')
            })
          return
        }
        this.processIdentityResponse(identityResponse)
        this.ngxService.stop()
        this.router.navigateByUrl('/home')
        this.toaster.success(`Hello${socialusers.name}`, 'You are Login Scuccesfully');

      }).catch(error=>console.log(error))
    }).catch(error=>{
      this.ngxService.stop()
      this.toaster.error('something Went Wrong')
      console.log(error)})
    }).catch(error=>{
      this.toaster.error('Something Went Wrong','Please Try Again');
     });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers => {
      this.ngxService.start()
     this.authenticationService.saveUserSocialAccountInfo(socialusers)
     .then(response => {
      const authenticationToken = response.token
      if (!authenticationToken) {
        return
      }
      localStorage.setItem('authenticatedByLoginToken', authenticationToken)
      this.authenticationService.getIdentityProfile().then((identityResponse:IGetProfileResponse)=>{
        if (_.isNil(identityResponse.profileData.identityTypeLookup) || !identityResponse.profileData.identityTypeLookup) {
          this.ngxService.stop()
          this.openModal()
            .then(() =>{
              this.ngxService.start()
              this.selectedRole()
              this.processIdentityResponse(identityResponse)
              this.localStorageService.lookupValue = this.role;
              this.ngxService.stop()
              this.router.navigateByUrl('/')
              this.toaster.success(`Hello${socialusers.name}`, 'You are Login Scuccesfully');

            })
            .catch(() => {
              this.authenticationService.logout()
              this.router.navigateByUrl('/login')
              this.toaster.error("You Cannot LoginIn Without Selecting Role ",'Please Try Again')
            })
          return
        }
        this.processIdentityResponse(identityResponse)
        this.ngxService.stop()
        this.router.navigateByUrl('/')
        this.toaster.success(`Hello${socialusers.name}`, 'You are Login Scuccesfully');

      }).catch(error=>console.log(error))
    }).catch(error=>console.log(error))
    }).catch(error=>{
      this.toaster.error('Something Went Wrong','Please Try Again');
     });
  }

  signOut(): void {
    this.authService.signOut();
  }
  async openModal() {
    return await this.modalComponent.open()
  }
  public async closeModal(): Promise<void> {
    return await this.modalComponent.close()
  }

  public async cancel(): Promise<void> {
    return await this.modalComponent.dismiss()
  }
  private processIdentityResponse(identity: IGetProfileResponse): void {
    localStorage.setItem('userData', JSON.stringify(identity.profileData))
    this.checkIfAccountIsComplete(identity)
  }
  public checkIfAccountIsComplete(identity: IGetProfileResponse): void {
    const request: IIsProfileCompletedRequest = {
      identityId: identity.profileData.identityID,
      isDoctor: identity.profileData.identityTypeLookup === IdentityType.Doctor,
      isPatient: identity.profileData.identityTypeLookup === IdentityType.Patient,
      isVisitor: identity.profileData.identityTypeLookup === IdentityType.Visitor
    }
  }

    public selectedRole() {
      console.log(this.role)
      const userId = this.identityService.getActiveIdentityId()
      console.log('userid',userId)
      return this.authenticationService.updateRole(userId,this.role).then(response=>{
        this.closeModal()
      }).catch(error=>console.log(error))

}
}
