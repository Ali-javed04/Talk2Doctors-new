import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { filter } from 'rxjs/operators';
import { IProfileData } from '../interfaces/appInterface';

@Component({
  selector: 'app-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss']
})
export class AppointmentDashboardComponent implements OnInit {
  public tabIndex :string
  public index: string;
  currenturl: string = '';

  constructor(private router: Router,
    private activeRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    let page = this.activeRouter.snapshot.queryParams.page
   if(_.isNil(page) ) {
        this.currenturl = 'pending'
      }else {
        this.currenturl = page
      }
  }
  currentState(url:string): boolean {
    return this.currenturl.includes(url)
   }
  public get getProfilePhoto(): any {
    if (_.isNil(this.identity.profilePicture)) {
      return '/assets/avatar.png';
    }
    return `data:image/jpeg;base64,${this.identity.profilePicture}`
  }
  public get identity(): IProfileData {
    return JSON.parse(localStorage.getItem('userData'))
  }
  public activePage(index){
    this.currenturl = index;
    this.router.navigate(['/appointment'], { queryParams: { page: index } })
  }

}
