import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../Services/authentication.service'
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ModalComponent } from '../modal/modal.component';
import { IGetProfileResponse, IIsProfileCompletedRequest, IVerificationCode, IVerifyAccount } from '../interfaces/appInterface';
import { result } from 'lodash';
import { IdentityType } from '../enums/enums';
import { LocalstorageService } from '../Services/localstorage.service';
import { Router } from '@angular/router';
import { ModalConfig } from '../modal/modalconfig';
import { IdentityService } from '../Services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('modal') private modalComponent: ModalComponent
  registerForm: FormGroup;
  submitted = false;
  pass: string  = 'password'
  verificationCode: string;
  emailId: string;
  isActive: boolean
  constructor(private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder ,
     private authenticationService:AuthenticationService,
     private toaster: ToastrService,
     private localStorageService:LocalstorageService,
     private router :Router,
     private identityService: IdentityService
     ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
public modalConfig :ModalConfig = {
  modalTitle: "Please Select the Role Before Login",
  dismissButtonLabel: "close",
  closeButtonLabel: "close"
}
// convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

  public eye(): void {
   if ( this.pass == 'text' ) {
     this.pass = 'password'
   } else if(this.pass == 'password'){
     this.pass = 'text'
   }
 }
 onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
   const data = this.registerForm.value
   this.ngxService.start()

   this.authenticationService.getAuthenticationToken(data)
   .then(response => {
    const authenticationToken = response.token
    if (!authenticationToken) {
      return
    }
    localStorage.setItem('authenticatedByLoginToken', authenticationToken)
    Promise.all([
      this.authenticationService.getIdentityProfile()
    ]).then(([identityResponse]) => {
      if (_.isNil(identityResponse.profileData.isActive) || !identityResponse.profileData.isActive) {
        this.openModal()
            .then(() =>{
              this.ngxService.start()
              this.verifyAccount()
              this.processIdentityResponse(identityResponse)
              this.localStorageService.IsActive = this.isActive;
              this.ngxService.stop()
              this.router.navigateByUrl('/')
              this.toaster.success(`Hello${identityResponse.profileData.firstname}`, 'You are Login Scuccesfully');
            })
          .catch(() => {
            this.ngxService.stop()
            this.authenticationService.logout()
            this.toaster.error('Something Went Wrong','Please try Again!')
          })
        return
      }
      this.processIdentityResponse(identityResponse)
    })
  })
  .catch(error => {
    this.ngxService.stop()
    this.toaster.error('Something Went Wrong ','Please try Again')
    console.log(error)
  })
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
  public verifyAccount() {
    const request: IVerifyAccount = {
      verificationCode: this.verificationCode,
      email: this.emailId
    }
    this.authenticationService.verifyAccount(request).subscribe(
      result => {
        this.closeModal()
        this.toaster.success('Account Verified Scucessfully')

      },
      error => {
        console.log(error)
        this.toaster.error('Invalid Verification Code')
      })
  }
  public ResendVerificationCode(): void {
    const request: IVerificationCode = {
      email: this.emailId
    }
    this.authenticationService.sendVerificationCode(request)
      .then(() =>this.toaster.success('Send Verification Code ScuccessFully') )
      .catch((error) => {
        console.error(error)
        this.toaster.error('Email Sending Went Wrong ','Please Try Again')
      })
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
    this.identityService.isProfileComplete(request)
    .then(response => {
      if (!response.completed) {
        this.router.navigate(['/survey'], { queryParams: { identityId: identity.profileData.identityID } })

      }
      else {
        this.router.navigateByUrl('/')
      }
    })
    .catch(error => console.log(error))
}
  }

