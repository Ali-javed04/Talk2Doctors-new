import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AuthInterceptor } from 'src/app/Services/auth.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormsModule} from '@angular/forms';
import { LocalstorageService } from 'src/app/Services/localstorage.service';
import { RegisterComponent } from './register/register.component';

@NgModule({


  declarations: [
    LoginComponent,
    SocialLoginComponent,
    ModalComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgxUiLoaderModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    SocialLoginModule,
    FormsModule


  ],
  providers: [
    AuthenticationService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '745135273259-ct5mocue7g6lt55db19gk64s8tj30e2e.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('421728439051751')
        }
      ]
    } as SocialAuthServiceConfig,
  },LocalstorageService]

})
export class LoginModule {
  constructor() {
    console.log("login module loaded")
  }
}
