import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IdentityType } from 'src/app/enums/enums';
import { IVerificationCode, IVerifyAccount } from 'src/app/interfaces/appInterface';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ModalConfig } from 'src/app/modal/modalconfig';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IdentityService } from 'src/app/Services/identity.service';
import { LocalstorageService } from 'src/app/Services/localstorage.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  @ViewChild('modal') private modalComponent: ModalComponent
  registerForm: FormGroup;
    submitted = false;
    public identityType = {
      Doctor: IdentityType.Doctor,
      Patient: IdentityType.Patient
    }
    verificationCode: string;
    emailId: string;

    constructor(
      private formBuilder: FormBuilder,
      private ngxService: NgxUiLoaderService,
      private authenticationService:AuthenticationService,
     private toaster: ToastrService,
     private localStorageService:LocalstorageService,
     private router :Router,
     private identityService: IdentityService) { }


  ngOnInit(): void {

    console.log("reg comp loaded")
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['1', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm.controls; }
  public modalConfig :ModalConfig = {
    modalTitle: "Please Select the Role Before Login",
    dismissButtonLabel: "close",
    closeButtonLabel: "close"
  }
public async onSubmit(): Promise<void> {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
    alert('not valid')
      return;
  }
  this.ngxService.start()
    const identitytype = Number(this.registerForm.value.role)
  const request = {
    registrationData : {
      email: this.registerForm.value.email,
      firstname: this.registerForm.value.firstName,
      genderTypeLookup: 1,
      identityTypeLookup: identitytype,
      lastname: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
    }

  }

  this.authenticationService.register(request)
    .then(() => {
      this.toaster.success('Registered ScucessFully')
      this.ngxService.stop()
      this.openModal()
        .then(() => this.getToken())
        .catch(() => {
          this.router.navigateByUrl('/')
          this.toaster.warning('Account Verification is must to Aceess the System')
        })
    })
    .catch(error => {
      this.ngxService.stop()
      this.toaster.error('Something Went Wrong','Your Account is not Created')
})
}
public getToken(): void {
  const data = {
    email: this.registerForm.value.email,
    password:this.registerForm.value.password
  }
  this.authenticationService.getAuthenticationToken(data)
    .then(responseToken => {
      const authenticationToken = responseToken.token
      if (!authenticationToken) {
        return
      }
      localStorage.setItem('authenticatedByLoginToken', authenticationToken)
      this.getUserProfile()
    })
}

public getUserProfile(): void {
  this.authenticationService.getIdentityProfile()
    .then(identityResponse => {
      localStorage.setItem('userData', JSON.stringify(identityResponse.profileData))
      this.ngxService.stop()
      this.router.navigate(['/survey'], { queryParams: { identityId: identityResponse.profileData.identityID } })

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
    email: this.registerForm.value.email
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

}
