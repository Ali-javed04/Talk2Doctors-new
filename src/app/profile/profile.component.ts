import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';
import { IdentityType } from '../enums/enums';
import { IAddIdentityPhotosRequest, IDoctorDegreeData, IDoctorSpecialityData, ILookupListEntry, IProfileData, IProvinceLookupItem, IUpdatePersonalDetailRequest } from '../interfaces/appInterface';
import { DateTimeService } from '../Services/date-time.service';
import { DoctorService } from '../Services/doctor.service';
import { IdentityService } from '../Services/identity.service';
import { LookupService } from '../Services/lookup.service';

// import custom validator to validate that password and confirm password fields match
//import { MustMatch } from './_helpers/must-match.validator';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  doctorForm: FormGroup;
  submitted = false;
  public countries: ILookupListEntry[]
  public states: IProvinceLookupItem[]
  public identityId: any
  public IdentityType = IdentityType
  public profile: IProfileData
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  identityType:IdentityType
  message = '';
  public record: IDoctorSpecialityData = {description: '', doctorID: 0, name: '', doctorSpecialityID: 0, xrefDoctorSpecialityID: 0}

  fileInfos: Observable<any>;
  identityPhoto: string;

  public selectedFile: ImageSnippet
  doctordata: import("c:/Users/beetechnica-1/Talk2Doctors-new/src/app/interfaces/appInterface").IGetProfileResponse;

  public addMoreField: IDoctorDegreeData[] = [];
  latitude: number;
  longitude: number;
  zoom: number;
  draggable: true
  tournament: any;
  lng: number;
  lat:number;
  doctorSpecialty: IDoctorSpecialityData
  specilityName: string = ''
  specilityDes: string = ''
  degreeName: string = ''
  degreeDes: string = ''
  updateButton: boolean = false;
  doctorDegrees: IDoctorDegreeData;
  record1: IDoctorDegreeData= {doctorDegreeID:0,xrefDoctorDegreeID:0,doctorID:0,name:'',description:''}
  constructor(private formBuilder: FormBuilder,
    private lookupService: LookupService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private IdentityService: IdentityService,
    private ngxService: NgxUiLoaderService,
    private toaster: ToastrService,
    private dateTimeService: DateTimeService,
    private doctorService: DoctorService,
    private ngZone: NgZone) { }


  ngOnInit(): void {
    this.identityId = this.activeRoute.snapshot.paramMap.get('identityId')
    this.countries = this.lookupService.getCountries()
    this.populateIdentityPhoto()

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gendertypeID: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      cnic: ['', Validators.required],
      address1: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.doctorForm = this.formBuilder.group({
      clinicCity: ['', Validators.required],
      clinicAddress1: ['', Validators.required],
      clinicMobileNumber: ['', Validators.required],
      clinicPhoneNumber: ['', Validators.required],
      licenceNumberOrPMDCNumber: ['', Validators.required],
      issuingAuthority: ['', Validators.required],
      affiliatedOrganization: ['', Validators.required],
      degrees: this.formBuilder.array([this.initItemRows()]),
      specialities: this.formBuilder.array([this.initItemRowsofSpecilities()]),
      experience: this.formBuilder.array([this.initItemRowsofExperience()]),
      clinicDays: this.formBuilder.array([]),
      numberOfPatientsCheckPerDay:['',Validators.required]
    })
    this.populateProfile()
    this.setCurrentLocation();


  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
   timingList: any[]  = [
     {day:'Sunday', startingTime:'',endingTime:'',holiday:false},
     {day:'Monday', startingTime:'',endingTime:'',holiday:false},
     {day:'Tuesday', startingTime:'',endingTime:'',holiday:false},
     {day:'Wednesday', startingTime:'',endingTime:'',holiday:false},
     {day:'Thursday', startingTime:'',endingTime:'',holiday:false},
     {day:'Friday',startingTime:'',endingTime:'',holiday:false},
     {day:'Saturday',startingTime:'',endingTime:'',holiday:false},
   ]


  get formArr() {
    return this.doctorForm.get('degrees') as FormArray
  }
  get formArrofSpecilities() {
    return this.doctorForm.get('specialities') as FormArray
  }
  get formArrofExperience() {
    return this.doctorForm.get('experience') as FormArray
  }
  get formArrofTiming() {
    return this.doctorForm.get('clinicDays') as FormArray
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }
  addNewRowofSpecilties() {
    this.formArrofSpecilities.push(this.initItemRowsofSpecilities());
  }
  addNewRowofExperience() {
    this.formArrofExperience.push(this.initItemRowsofExperience());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index)
  }
  deleteRowofSpecilities(index: number) {
    this.formArrofSpecilities.removeAt(index)
  }
  deleteRowofExperience(index:number) {
    this.formArrofExperience.removeAt(index)
  }
  initItemRows() {
    return this.formBuilder.group({
      doctorDegreeID:[''],
      xrefDoctorDegreeID: [''],
      name: [''],
      doctorID:[''],
      description: [''],
    });
  }
  initItemRowsofSpecilities() {
    return this.formBuilder.group({
      doctorSpecialityID:[''],
      xrefDoctorSpecialityID:[''],
      name: [''],
      doctorID:[''],
      description: ['']
    })
  }
  initItemRowsofExperience() {
    return this.formBuilder.group({
      doctorExperienceID:[''],
      xrefDoctorExperienceID:[''],
      hospitalName:[''],
      from:[''],
      to:[''],
      designation:['']
    })
  }
  initItemRowsofTiming() {
    return this.formBuilder.group({
      startingTime:[''],
      endingTime:[''],
      holiday:['']
    })
  }

  submit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      this.toaster.error('Form is Incompleted','Please Fill All the Field')
      return;
    }
      this.profile.clinicCity = this.doctorForm.value.clinicCity
      this.profile.clinicAddress1 = this.doctorForm.value.clinicAddress1
      this.profile.clinicMobileNumber = this.doctorForm.value.clinicMobileNumber
      this.profile.clinicPhoneNumber = this.doctorForm.value.clinicPhoneNumber
      this.profile.licenceNumberOrPMDCNumber = this.doctorForm.value.licenceNumberOrPMDCNumber
      this.profile.issuingAuthority = this.doctorForm.value.issuingAuthority
      this.profile.affiliatedOrganization = this.doctorForm.value.affiliatedOrganization
      this.profile.degrees = this.doctorForm.value.degrees
      this.profile.specialities = this.doctorForm.value.specialities
       this.profile.experiences = this.doctorForm.value.experiences
      this.profile.clinicDays = this.doctorForm.value.clinicDays
      this.profile.numberOfPatientsCheckPerDay = this.doctorForm.value.numberOfPatientsCheckPerDay
      this.profile.clinicLocation.latitude = this.lat
      this.profile.clinicLocation.longitude = this.lng

     this.ngxService.start()
    this.doctorService.updateDoctorDetail(this.profile.doctorID,this.profile).subscribe(
      (res)=> {
        this.ngxService.stop()
        this.toaster.success('Update Data SuccessFully')

      },
      (error)=>{
        console.log(error)
        this.ngxService.stop()
        this.toaster.error('Something Went Wrong','Please Try Again')
      }
    )
    console.log(this.formArr.value)
    console.log(this.doctorForm.value)
  }
  src
  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.src = reader.result;
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      const request: IAddIdentityPhotosRequest = {
        identityID: this.identityId,
        identityPhoto: e.target.result.slice(e.target.result.indexOf(',') + 1),
        extention: this.fetchExt(file.name),
      }
      this.IdentityService.addPhoto(request).then(response => {

        this.populateIdentityPhoto()
      })
    };
  }
  get f() { return this.registerForm.controls; }
  get fd() { return this.doctorForm.controls; }
  savePersonalDetail() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.toaster.error('Form is Incompleted','Please Fill All the Field')
      return;
    }
    this.profile.firstname = this.registerForm.value.firstname
    this.profile.lastname = this.registerForm.value.lastname
    this.profile.email = this.registerForm.value.email
    this.profile.genderTypeID = this.registerForm.value.gendertypeID
    this.profile.address1 = this.registerForm.value.address1
    this.profile.city = this.registerForm.value.city
    this.profile.state = this.registerForm.value.state
    this.profile.country = this.registerForm.value.country
    this.profile.dateOfBirth = this.registerForm.value.dateOfBirth
    this.profile.cnic = this.registerForm.value.cnic
    this.profile.mobileNumber = this.registerForm.value.mobileNumber
    this.profile.degrees = this.registerForm.value.name
    console.log('updated profile', this.profile)
    this.IdentityService.updatePersonalDetail(this.identityId, this.profile).subscribe(
      (res) => {
        this.toaster.success('Date Save Scuccessfully')
      },
      (error) => {
        console.log(error)
        this.toaster.error('Something Went Wrong', 'Please Try Again')
      }
    )


  }
  public getSelectedCountryStates(country: number): void {
    console.log('onchange ', country)
    let countryLookup: number = country ? country : 155
    this.states = this.lookupService.getStatesByCountry(countryLookup)
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  public populateIdentityPhoto(): void {
    this.IdentityService.getPhoto(this.identityId)
      .then(response => {
        const imageString = _.isNil(response.identityPhoto) ? '/assets/avatar.png' : `data:image/jpeg;base64,${response.identityPhoto}`
        this.identityPhoto = imageString

      }).catch(error => console.log(error))

  }
  public uploadProfilePhoto(file: any, invalidFile: any): void {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (e: any) => {
      const request: IAddIdentityPhotosRequest = {
        identityID: this.identityId,
        identityPhoto: e.target.result.slice(e.target.result.indexOf(',') + 1),
        extention: this.fetchExt(file.name),
      }
      this.IdentityService.addPhoto(request)
        .then(response => {
          this.populateIdentityPhoto()
          this.toaster.success("Profile Picture Updated Scuccessfully")
        })
    };
  }
  public fetchExt(name: string): string {
    const splitName = name.split('.')
    let extensionName = ''
    if (splitName.length > 0) {
      extensionName = splitName[splitName.length - 1]
    }
    return extensionName
  }
  public populateProfile(): void {
    this.IdentityService.getProfileByIdentityId(this.identityId).subscribe(
      (response) => {
        this.profile = response.profileData
        this.doctordata = response
        console.log('doctordata', this.doctordata)
        this.profile.dateOfBirth = !_.isNil(this.profile.dateOfBirth) ? this.profile.dateOfBirth : '01/01/2000'
        this.getSelectedCountryStates(this.profile.country)
        this.convertBirthdayUTCStringToMoment()
        this.registerForm.patchValue({
          firstname: this.profile.firstname,
          lastname: this.profile.lastname,
          email: this.profile.email,
          gendertypeID: this.profile.genderTypeID,
          address1: this.profile.address1,
          city: this.profile.city,
          clinicAddress1: this.profile.clinicAddress1,
          clinicProvince: this.profile.clinicProvince,
          cnic: this.profile.cnic,
          country: this.profile.country,
          dateOfBirth: this.dateTimeService.convertToDateOnly(this.profile.dateOfBirth.toString()),
          mobileNumber: this.profile.mobileNumber,
          phoneNumber: this.profile.phoneNumber,
          state: this.profile.state
        });
        console.log('degrees,', this.profile.degrees)
        this.doctorForm.patchValue({
          issuingAuthority: this.profile.issuingAuthority,
          licenceNumberOrPMDCNumber: this.profile.licenceNumberOrPMDCNumber,
          clinicAddress1: this.profile.clinicAddress1,
          clinicCity: this.profile.clinicCity,
          clinicDays: this.profile.clinicDays,
          clinicEmail: this.profile.clinicEmail,
          clinicEndTime: null,
          clinicLocation: { latitude: null, longitude: null },
          clinicMobileNumber: this.profile.clinicMobileNumber,
          clinicPhoneNumber: this.profile.clinicPhoneNumber,
          numberOfPatientsCheckPerDay: this.profile.numberOfPatientsCheckPerDay,
          onlineAppointmentEndTime: null,
          onlineAppointmentStartTime: null,
          affiliatedOrganization: this.profile.affiliatedOrganization,

        });
        if(_.isNil(this.profile.clinicLocation.longitude)){
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.profile.clinicLocation.latitude = position.coords.latitude;
              this.profile.clinicLocation.longitude = position.coords.longitude;
              this.zoom = 15;
              this.lat = this.profile.clinicLocation.latitude
              this.lng = this.profile.clinicLocation.longitude
            })
          }else {
            this.lat = this.profile.clinicLocation.latitude
            this.lng = this.profile.clinicLocation.longitude
          }
        }

        if(_.isEmpty(this.profile.degrees.length)){
          this.formArr.removeAt(0)
          this.profile.degrees.forEach((x) => {
            this.formArr.push(this.formBuilder.group(x))
          });
        }
        if(_.isEmpty(this.profile.specialities.length)){
          this.formArrofSpecilities.removeAt(0)
          this.profile.specialities.forEach((x)=>{
            this.formArrofSpecilities.push(this.formBuilder.group(x))
          })
        }
        // if(_.isEmpty(this.profile.timingList.length)){
        //   this.formArr.removeAt(0)
        //   this.profile.timingList.forEach((x) => {
        //     this.formArrofTiming.push(this.formBuilder.group(x))
        //   });
        // }
        this.timingList.forEach((x) => {
          this.formArrofTiming.push(this.formBuilder.group(x))
        });
        console.log("patch",this.doctorForm.value)
        this.populateDoctorSpecialities()
        this.populateDoctorDegrees()
      },
      (error) => {
        console.log(error)
      }
    )
  }
  private convertBirthdayUTCStringToMoment(): void {
    if (this.profile.dateOfBirth !== null) {
      this.profile.dateOfBirth = this.dateTimeService.convertToDateOnly(this.profile.dateOfBirth.toString())
    }
  }
  public saveDoctorDetail(): void {

    this.doctorService.updateDoctorDetail(this.profile.doctorID, this.profile).subscribe(
      (res) => {
        this.toaster.success('Date Save Scuccessfully')
      },
      (error) => {
        console.log(error)
        this.toaster.error('Something Went Wrong', 'Please Try Again')
      }
    )
  }


  public removeField(index): void {
    this.addMoreField.splice(index, 1);
  }
    public locationChangedHandler(event): void {
      this.profile.clinicLocation = {
        latitude: event.coords.lat,
        longitude: event.coords.lng
      }
      console.log('change location',this.profile.clinicLocation)
    }
    markerDragEnd(  $event: google.maps.MouseEvent) {
      this.lat = $event.latLng.lat();
      this.lng = $event.latLng.lng();
      console.log("lng",this.lng)
      console.log("lat",this.lat)
    }
     addSpecialty() {
       if(this.specilityName.length < 0){
         return
       }
       this.ngxService.start()
       this.record.doctorID = this.profile.doctorID
       console.log('this.speciltyname',this.specilityName)
       this.record.name = this.specilityName
       this.record.description = this.specilityDes
       console.log('this.record',this.record)
       this.doctorService.createDoctorSpeciality(this.record)
        .subscribe((res) => {
          this.ngxService.stop()
          this.populateDoctorSpecialities()
          this.toaster.success("Add specialty scucessfully")
        }
        ,(error) => {
          console.log(error)
          this.ngxService.stop()
          this.toaster.error('Something Went Wrong')
        })
    }
    EditSpecialityButton(doctorSpecialty: IDoctorSpecialityData) {
      this.specilityName = doctorSpecialty.name
      this.specilityDes = doctorSpecialty.description
      this.record = doctorSpecialty
      this.updateButton = true
    }
     editSpecialty(): void{

       this.record.name = this.specilityName
       this.record.description = this.specilityDes
       this.doctorService.updateDoctorSpeciality(this.record)
        .then(() => {
          this.toaster.success('update Specialtiy Successfully')

        })
        .catch((error) => {
          console.log(error)
          this.toaster.error('Something Went Wrong')
        })
        .finally(() => this.ngxService.stop())
    }

     populateDoctorSpecialities(): void {
      this.doctorService.getDoctorSpecialities(this.profile.doctorID)
        .then((response) => {
          this.doctorSpecialty =  response
          console.log('specilitylist',this.doctorSpecialty)


        })
        .catch(error => this.toaster.error('Failed to get doctor specialities'))
    }

     onDeleteSpecialityClick(doctorSpecialty: IDoctorSpecialityData): void {
            this.doctorService.deleteDoctorSpeciality(doctorSpecialty.xrefDoctorSpecialityID, this.profile.doctorID)
              .then(() => {
                this.populateDoctorSpecialities()
                this.toaster.success('Doctor Specility Delelted SuccessFully')

              })
              .catch(() => this.toaster.error('Something Went Wrong','Please try Again '))
          }
          public get identityTypeLookup(): number {
            const profileData = JSON.parse(localStorage.getItem('userData'))
            if(profileData) {
              return profileData.identityTypeLookup
            }
          }
          public AddMoreSpeciltyButton() {
            this.specilityName = ''
            this.specilityDes = ''
          }
          public populateDoctorDegrees(): void {
            this.doctorService.getDoctorDegrees(this.profile.doctorID)
            .then((response) => {
              this.doctorDegrees =  response
              console.log('doctorDegrees',this.doctorDegrees)


            })
            .catch(error => this.toaster.error('Failed to get doctor Degrees'))
          }

          public onDeleteDegreeClick(doctorDegree: IDoctorDegreeData): void {
            this.doctorService.deleteDoctorDegree(doctorDegree.xrefDoctorDegreeID, this.profile.doctorID)
            .then(() => {
              this.populateDoctorDegrees()
              this.toaster.success('Doctor Degree Delelted SuccessFully')

            }).catch(error=>{
              console.log(error)
              this.toaster.error('Not Delelted the degree Scuccesscfully','Try Again Later !')
            })
          }
          addDegree() {
            if(this.degreeName.length < 0){
              return
            }
            this.ngxService.start()
            this.record1.doctorID = this.profile.doctorID
            console.log('this.speciltyname',this.degreeName)
            this.record1.name = this.degreeName
            this.record1.description = this.degreeDes
            console.log('this.record1',this.record1)
            this.doctorService.createDoctorDegree(this.record1)
             .subscribe((res) => {
               this.ngxService.stop()
               this.populateDoctorDegrees()
               this.toaster.success("Add Degree scucessfully")
             }
             ,(error) => {
               console.log(error)
               this.ngxService.stop()
               this.toaster.error('Something Went Wrong')
             })

          }
          editDegree() {
            this.record1.name = this.degreeName
            this.record1.description = this.degreeDes
            this.doctorService.updateDoctorDegree(this.record1)
             .then(() => {
               this.toaster.success('update Degree Successfully')

             })
             .catch((error) => {
               console.log(error)
               this.toaster.error('Something Went Wrong')
             })
             .finally(() => this.ngxService.stop())

          }
          AddMoreDegreeButton() {
            this.degreeName = ''
            this.degreeDes = ''

          }
          EditDegreeButton(doctorDegree: IDoctorDegreeData) {

              this.degreeName = doctorDegree.name
              this.degreeDes = doctorDegree.description
              this.record1 = doctorDegree
              this.updateButton = true
            }


        }








