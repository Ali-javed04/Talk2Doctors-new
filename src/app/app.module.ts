import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerconfigserviceService } from './Services/serverconfigservice.service';
import { SelectRoleComponentComponent } from './login/social-login/select-role-component/select-role-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ModalComponent } from './modal/modal.component';
import { LoginModule } from './login/login.module';






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SelectRoleComponentComponent,
    SearchPipe,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AutocompleteLibModule,

  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  ServerconfigserviceService,
   {provide : APP_INITIALIZER,
     useFactory : initFunction,
      deps: [ServerconfigserviceService] ,
       multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initFunction(config : ServerconfigserviceService)
{
  return ()=> config.getEnglishLookupList();
}
