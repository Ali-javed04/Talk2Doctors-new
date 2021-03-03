import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IdentityType } from 'src/app/enums/enums';
import { IMedicalRecordResponse, IUpdateDoctorDashboardAppointmentRequest } from 'src/app/interfaces/appInterface';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DateTimeService } from 'src/app/Services/date-time.service';
import { IdentityService } from 'src/app/Services/identity.service';

@Component({
  selector: 'app-pending-appointment',
  templateUrl: './pending-appointment.component.html',
  styleUrls: ['./pending-appointment.component.scss']
})
export class PendingAppointmentComponent implements OnInit {

  public doctorId: number
  public identityTypeLookup: any
  public MAX_ROWS_PER_PAGE = 15
  public filter: string
  public appointmentHistories: any[]
  public appointmentDates: Date[]
  public tableOptions: any
  public medicalRecord: IMedicalRecordResponse
  public IdentityType = IdentityType
  public medicalRecordData = []
  public noRecord = 0;
  rejectinput: any;
  public constructor(
    public appointmentService: AppointmentService,
    private dateTimeService: DateTimeService,
    private identityService:IdentityService,
    private authenctationService: AuthenticationService

  ) {}
  public ngOnInit(): void {
    this.doctorId = this.identityService.getActiveIdentityId()
    this.filter = ''
    this.tableOptions = {
      appScopeProvider: this,
      columnDefs: [],
      data: [],
      totalItems: 0,
      enableColumnMenus: false,
      enableColumnResizing: true,
      enableHortizontalScrollbar: 2,
      enableSorting: true,
      enableVerticalScrollbar: 0,
      rowHeight: 45,
      enablePaginationControls: false,
      useExternalPagination: true,
      allowExternalFetchAll: true,
      virtualizationThreshold: this.MAX_ROWS_PER_PAGE,
      minRowsToShow: this.MAX_ROWS_PER_PAGE,
      paginationPageSize: this.MAX_ROWS_PER_PAGE,
      expandableRowHeight: 150,
      enableExpandableRowHeader: true,
      enableExpandable: true,
      multiSelect: true,

    }
    this.populatePreviousAppointments()
    this.getAppointmentDetail(1)
  }
  public populatePreviousAppointments(): void {
    this.appointmentService.getDoctorAppointmentHistories(this.doctorId)
      .then(response => {
        this.appointmentHistories = response.items
        this.appointmentDates = this.appointmentHistories.map(appointment => new Date(this.dateTimeService.convertStringToMomentDate(appointment.appointmentDate).setHours(0, 0, 0, 0)))
        this.tableOptions.totalItems = response.count
        this.tableOptions.data = this.appointmentHistories
        this.appointmentHistories = this.appointmentHistories.filter(x=>x.caseStatusLookup === 6)
        this.noRecord = this.appointmentHistories.length

      })
      .catch(error => {
        console.error(error)
      })
  }
  public getAppointmentDetail(medicalRecordId: number): void {
    if (_.isNil(medicalRecordId)) {
      return;
    }

    this.appointmentService.get(medicalRecordId)
      .then(response => {
        this.medicalRecord = response
        this.medicalRecord = this.medicalRecord

      })
      .catch(error => console.log(error))

  }

  public getDisabilityLookupText(lookupIndex: number): string {
    return this.authenctationService.getNameValue(this.authenctationService.getDisabilityTypes(), lookupIndex)
  }
  public updateAppointment(medicalRecordId,caseStatusId){
    const request: IUpdateDoctorDashboardAppointmentRequest = {
      medicalRecordID: medicalRecordId,
      caseStatusId: caseStatusId,
      diagnosis: '',
      prescription: '',
      onlineAppointmentModifiedTime: null,
      medicalAttachment: null
    }

    this.appointmentService.updateDoctorDashboardAppointment(request)
      .then(() =>{
        //this.AppServicesAsync.ToastService.toastSaveSuccess()
        this.populatePreviousAppointments()
      })
     // .catch(() => //this.AppServicesAsync.ToastService.toastSaveFailed())
     // .finally(() =>// this.isLoading = false)

  }


  public rejectReason(): boolean {
    if(this.rejectinput.length > 10){
      return false
    }else {
      return true
    }

  }
  public emptyinputvalue() {
    this.rejectinput = ''
  }



}

