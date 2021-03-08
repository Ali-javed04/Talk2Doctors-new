import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { IdentityType } from '../enums/enums';
import { ICountSpecility, ITopRatedDoctors } from '../interfaces/appInterface';
import { IdentityService } from '../Services/identity.service';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.scss']
})
export class SearchDoctorComponent implements OnInit {


  public specility: any

  public doctorstodisplay: any
  public IdentityType = IdentityType
  public token: boolean
  public specialdoctor: string = ''
  public search: any
  public male: boolean
  public female: boolean
  public Cardiologist: boolean
  public Neurology: boolean
  public Pediatrician: boolean
  public Anesthesiology: boolean
  public Dentist: boolean
  public Gynecologists: boolean
  public GeneralSergon: boolean
  public Radiologists: boolean
  public name: string
  public gender: any
  public specilty: any = {
    Cardiologist : false,
    Neurology : false,
    Pediatrician : false,
    Anesthesiology : false,
    Dentist : false,
    Gynecologists : false,
    GeneralSergon : false,
    Radiologists : false,
  }

  public doc: any
  public filters: any
  public spc: string[] = []

  public gedd: any
  public ged = []
  public geed: string = ''
  public sppc: string =  ''
  public topRatedDoctors: ITopRatedDoctors[]
  public topRated: any
  public countspecility: ICountSpecility[]
  public spx = []
  ngOnInit(): void {
    this.specility = this.activeRouter.snapshot.queryParams
    console.log('locationParams', this.activeRouter.snapshot.queryParams)
    const params =  this.activeRouter.snapshot.queryParams
    this.populateDoctorsList()
    if(!_.isNil(params)) {
      if(_.has(params, 'specility')) {
      this.spc.push(params.specility)
        console.log('specility in parms ',this.spc)
      }
      if(_.has(params, 'gender')) {
        this.gedd = params.gender
      }
      if(_.has(params, 'name')) {
        this.specialdoctor =  this.activeRouter.snapshot.queryParams.name
      }
    }


  }

  public constructor(
    private searchService: SearchService,
    private IdentityService: IdentityService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    ) {
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }


    parametercheckup(){
    this.countspecility
    let male = 'male'
    if(this.ged.find(item=>item === male)){
      this.male = true
    }
    let female = 'female'
    if(this.ged.find(item=>item === female)){
      this.female = true
    }
      this.countspecility = _(this.countspecility).map((item) => {
      if( this.spc .find(i=>i === item.name) ){
        return _.assign(item, {isChecked: true})
      }else {
        return _.assign(item, {isChecked: false})
      }
    })  .value()
  }

  public onClickSpeciality(spciality): void {
    spciality.isChecked = !spciality.isChecked
  }

  public populateDoctorsList(): void {
    this.searchService.getDoctorsList('')
      .then(response => {
        this.countspecility = response.countDoctorBySpeciality
        console.log("response",response)
        this.countspecility = _.sortBy(this.countspecility, x => x.totalDoctors).reverse()
        console.log('iam there',this.countspecility)
        this.countspecility = _(this.countspecility).map((item) => {
          if( this.spc.find(i=>i === item.name) ){
              console.log('name found')
            return _.assign(item, {isChecked: true})
          }else {
            return _.assign(item, {isChecked: false})
          }
        })
          .value()
         this.topRatedDoctors = response.doctorsList
        this.parametercheckup()
        this.filterData()
      })
      .catch(error => console.error(error))
  }
  public  identityTypeLookup(): number {
    const profileData = JSON.parse(localStorage.getItem('userData'))
    if(profileData) {
      return profileData.identityTypeLookup
    }
  }
  public get hasValidAuthenticationToken(): boolean {
    let abc =  this.IdentityService.hasValidAuthenticationToken();
    return abc
  }
  public bookappoitment(docId: number){
    if(!this.hasValidAuthenticationToken) {
      const url = `make-appointment/${docId}`
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } })

    } else if(this.identityTypeLookup() == IdentityType.Patient){
      this.router.navigate(['/appointmentViewPatient'], { queryParams: {identityId: docId} })
    } else {
      alert("you are not authorized person to take a appoimentant")
    }
  }
  public isChecked(key: string): boolean {
    const isChecked = this.specility === key
    this.specilty[key] = isChecked
    return isChecked
  }
  public filterData(){
    this.doctorstodisplay = this.topRatedDoctors
    if(this.specialdoctor){
      this.doctorstodisplay = this.doctorstodisplay.filter(item => item.doctorName.toLowerCase().startsWith(this.specialdoctor.toLowerCase()))
    }
    // if(this.ged.length > 0){
    //   this.doctorstodisplay =  this.doctorstodisplay.filter(item => _.includes(this.ged,item.gender))
    // }
    if (this.spc.length > 0) {
      this.doctorstodisplay =  this.doctorstodisplay.filter(item => _.includes(this.spc, item.latestDegreeTitle))
    }
  }

  public applyFilter() {
    const params: NavigationExtras =  {
      queryParams: {
     }
   }
    this.ged  = []
    this.spc = []
    this.specialdoctor
    if(this.male){
      this.ged.push('male')
      const m = 'male'
      this.geed = this.geed.concat(m)
    } if(this.female) {
      this.ged.push( 'female')
      const f = 'female'
      this.geed = this.geed.concat(f)
    }
    if(this.countspecility){
      this.spc = this.countspecility
      .filter((item: any) => item.isChecked)
      .map((item: any) => item.name)
    }
    if(this.specialdoctor){
      params.queryParams.name = this.specialdoctor
    }
    if(this.ged.length>0){
      params.queryParams.gender = this.ged
    }
    if(this.spc.length>0){
      params.queryParams.specility = this.spc
    }


    this.router.navigate(['/search'],params )

  }
  public covertPhotoUrl(photoUrl){
    return `data:image/jpeg;base64,${photoUrl}`

  }

}
