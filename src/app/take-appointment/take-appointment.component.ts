import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IdentityType } from '../enums/enums';
import { IAttachmentData, ILookupListEntry, IMedicalRecordResponse, IUpdateDoctorDashboardAppointmentRequest } from '../interfaces/appInterface';
import { AngularService } from '../Services/angular.service';
import { AppointmentService } from '../Services/appointment.service';
import { DoctorService } from '../Services/doctor.service';
import { IdentityService } from '../Services/identity.service';
import { LookupService } from '../Services/lookup.service';

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.scss']
})
export class TakeAppointmentComponent implements OnInit {
  public appointmentId: number
  public medicalRecordId: any
  public medicalRecord: IMedicalRecordResponse
  public filteredListOfPrescriptions: string[] = []
  public filteredListOfDiagnosis: string[] = []

  public selectedDiagnosis = []
  public selectedPrescriptions = []
  public showDiagnosisList = false
  public showPrescriptionList = false
  public newDiagnosisValue: string
  public newPrescriptionValue: string
  public newDosageValue: string
  public newDurationUnitValue: string
  public newDurationCountValue: string
  public searchableDiagnosisText: string
  public searchablePrescriptionText: string
  public listOfDiagnosis: string[]
  public listOfPrescriptions: any[]
  public listDiagnosisMedications: any[]
  public filteredMedicines: any[]
  public dosageList: any[]
  public doctorId: number
  public listOfPrescription: any[]
  attachment: IAttachmentData;
  public caseStatuses: ILookupListEntry[]

  constructor(
    private ngxService: NgxUiLoaderService,
    private toaster: ToastrService,
    private appointmentService: AppointmentService,
    private router: Router,

    private lookupService: LookupService,
    private identityService: IdentityService,
    private activeRouter: ActivatedRoute,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.doctorId = this.identityService.getActiveDoctorId()

      this.medicalRecordId = this.activeRouter.snapshot.paramMap.get('medicalRecordId');;

    console.log('queryparms',this.medicalRecordId)
    this.caseStatuses = this.lookupService.getCaseStatuses()
      this.getAppointmentDetail()

  }
  public get identityTypeLookup(): number {
    const profileData = JSON.parse(localStorage.getItem('userData'))
    if (profileData) {
      return profileData.identityTypeLookup
    }
  }

  public loaddiagnosis(): void {
    this.doctorService.loadDiagnosis(this.doctorId)
    .then(
      (response: any) => {
        this.listOfDiagnosis = response.map((x: any) =>  (x.name))
        this.filteredListOfDiagnosis = this.listOfDiagnosis
        console.log("daignosis",this.filteredListOfDiagnosis)
      }).catch(error=>console.log(error))
  }
  public loadprescriptions(): void {
    this.doctorService.loadPrescriptions(this.doctorId)
      .then(
        (response: any) => {
          this.listOfPrescription = response
          this.listOfPrescriptions = response
          this.listOfPrescriptions = _.uniqBy(response, (x: any) => {return x.medicineName})
          this.listOfPrescriptions = this.listOfPrescriptions.map((x: any) => (x.medicineName))
          this.filteredListOfPrescriptions = this.listOfPrescriptions
        }).catch(error=>console.log(error))
  }
  public getDagnosismedication(): void {
    this.doctorService.getDagnosisMedication(this.doctorId)
    .then(
      (response: any) => {
        this.listDiagnosisMedications = response.map((x: any) =>  (x))
      }).catch(error=>console.log(error))
  }
  public getAppointmentDetail(): void {
    if (_.isNil(this.medicalRecordId)) {
      return
    }

    this.appointmentService.getappointmentDetail(this.medicalRecordId)
      .then(response => {
        this.medicalRecord = response
        console.log('medicalrecord',this.medicalRecord)
        if (this.identityTypeLookup === IdentityType.Doctor) {
          return
        }
      })
      .catch(error => {
        this.ngxService.stop()
        console.log(error)
      })

  }
  public openVideoChatWindow(callDTO: any): void {
    if (_.isNil(callDTO)) {
      callDTO = {
        calleeId: this.medicalRecord.medicalRecordData.patientIdentityID,
        callerId: this.medicalRecord.medicalRecordData.doctorIdentityID,
        appointmentId: this.medicalRecord.medicalRecordData.medicalRecordID,
        peerId: undefined
      }
    }
    // this.ModalManager
    //   .open('chatView', callDTO, 'lg', false)
    //   .then(response => { },
    //     error => {
    //       console.error('failure response', error)
    //     }
    //   )
  }

  public updatePatientAppointmentDetails(): void {

    this.ngxService.start()
    this.medicalRecord.medicalRecordData.diagnosis = this.selectedDiagnosis.toString();
    this.medicalRecord.medicalRecordData.prescription = JSON.stringify(this.selectedPrescriptions) ;

    const request: IUpdateDoctorDashboardAppointmentRequest = {
      medicalRecordID: this.medicalRecord.medicalRecordData.medicalRecordID,
      caseStatusId: 4,
      diagnosis: this.medicalRecord.medicalRecordData.diagnosis,
      prescription: this.medicalRecord.medicalRecordData.prescription,
      onlineAppointmentModifiedTime: null,
      medicalAttachment: this.attachment
    }
    this.appointmentService.updateDoctorDashboardAppointment(request)
      .then(() =>{
        this.ngxService.stop()
        this.toaster.success('Completed Appointment Scucessfully')
        this.router.navigate(['/appointment'],{queryParams : {page:'complete'}})

      })
      .catch(() => {
        this.ngxService.stop()
        this.toaster.error('Something Went Wrong','Appointment Cannot Save')
      })


  }
  public toggleDiagnosis(): void {
    this.showDiagnosisList = !this.showDiagnosisList
    this.showPrescriptionList = false
  }
  public onSelectDiagnosis(selectedItem: string): void {
    let isAlreadyExistInArray = this.selectedDiagnosis.includes(selectedItem)
    if (isAlreadyExistInArray) {
      return
    }
    else {
      this.selectedDiagnosis.push(selectedItem)

      this.filteredMedicines = this.listDiagnosisMedications
        .find(diagnose => diagnose.name === selectedItem).medicines

      if(this.filteredMedicines.length === 0)
      {
        return
      }

      this.filteredMedicines.forEach(element => {
        var isItemAlreadyExist = this.selectedPrescriptions.some(name=> name.medicineName === element.medicineName);
        if(!isItemAlreadyExist){
          const newPreference = {
            medicineName: element.medicineName,
            dosage: element.dosage,
            dosageDuration: element.duration,
            durationCount: element.durationCount
          }
          this.selectedPrescriptions.push(newPreference)
        }
      });


    }
    console.log("slected daignosis",this.selectedDiagnosis)

  }
  public togglePrescriptions(): void {
    this.showPrescriptionList = !this.showPrescriptionList
    this.showDiagnosisList = false
  }
  public onSelectPrescription(selectedItem): void {
    let isAlreadyExistInArray = this.selectedPrescriptions.some(x=> x.medicineName === selectedItem)
    if (isAlreadyExistInArray) {
      return
    }
    else {
      var getmedicines = this.listOfPrescription.find(x=> x.medicineName === selectedItem)
      console.log("medicinesfiltered", getmedicines)
      this.selectedPrescriptions.push(getmedicines)
    }

    console.log("slected medicine",this.selectedPrescriptions)

  }
  public removeMeidcation(medicationToRemove: any): void{

    this.selectedPrescriptions.splice(medicationToRemove,1)
  }

  public getUtcDateTimeFromDate(date: string): string {
    return moment.utc(date).toISOString()
  }

  public getDate(date: string): string {
    return date
  }

  public getTimeFromDate(date: string): string {
   return date
  }
  public getLookupNameByLookup(lookup: number): string {
    return this.lookupService.getNameValue(this.lookupService.getCaseStatuses(), lookup)
  }

  public getDisabilityLookupText(lookupIndex: number): string {
    return this.lookupService.getNameValue(this.lookupService.getDisabilityTypes(), lookupIndex)
  }
  public accepteCall() {
   // this.openVideoChatWindow(angular.copy(this.incomingCall))
    //this.incomingCall = null

  }

  public declineCall() {
   // this.incomingCall = null
  }
  public removeDiagnose(diagnoseToRemove: any): void{
    this.selectedDiagnosis.splice(diagnoseToRemove,1)
  }

}
