import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { IdentityType } from '../enums/enums';
import { IDoctorAppointmentHistoryData, IMedicalRecordResponse } from '../interfaces/appInterface';
import { AppointmentService } from '../Services/appointment.service';
import { IdentityService } from '../Services/identity.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.scss']
})
export class ReportGenerationComponent implements OnInit {
  medicalRecordId: any
  diagnosis: string []
  prescriptions: any []

  public doctorId: number
  public MAX_ROWS_PER_PAGE = 15
  public filter: string
  public appointmentHistories: IDoctorAppointmentHistoryData[]
  public appointmentDates: Date[]
  public tableOptions: any
  public medicalRecord: IMedicalRecordResponse
  public IdentityType = IdentityType
  public medicalRecordData = []
  public hetts: HTMLElement;
  public images: any
  public data: any

  constructor(
    private appointmentService: AppointmentService,
    private IdentityService:IdentityService,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.doctorId = this.IdentityService.getActiveIdentityId()
    this.medicalRecordId = this.activeRouter.snapshot.paramMap.get('medicalRecordId');
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
    this.getAppointmentDetail(this.medicalRecordId)
  }
  takePrint(){
    window.print();
  }
  public populatePreviousAppointments(): void {

    this.appointmentService.getDoctorAppointmentHistories(this.doctorId)
      .then(response => {
        this.appointmentHistories = response.items
       // this.appointmentDates = this.appointmentHistories.map(appointment => new Date(this.AppServicesAsync.ApiAsync.DateTimeService.convertStringToMomentDate(appointment.appointmentDate).setHours(0, 0, 0, 0)))
        this.tableOptions.totalItems = response.count
        this.tableOptions.data = this.appointmentHistories
        this.appointmentHistories = this.appointmentHistories.filter(x=>x.caseStatusLookup === 3)

      })
      .catch(error => {
        console.error(error)
      })
  }
  public getAppointmentDetail(medicalRecordId: number): void {
    if (_.isNil(medicalRecordId)) {
      return;
    }

    this.appointmentService.getappointmentDetail(medicalRecordId)
      .then(response => {
        this.medicalRecord = response
        this.medicalRecord = this.medicalRecord
        console.log("record",this.medicalRecord)
        this.diagnosis = this.medicalRecord.medicalRecordData.diagnosis.split(",")
        this.prescriptions = JSON.parse(this.medicalRecord.medicalRecordData.prescription);
        console.log("medical record data",this.medicalRecord.medicalRecordData)
      })
      .catch(error => console.log(error))
  }
  generatePdf() {
  this.data = document.getElementById('contentToConvert');
  html2canvas(this.data, { allowTaint: true }).then(canvas => {
   let HTML_Width = canvas.width;
   let HTML_Height = canvas.height;
   let top_left_margin = 15;
   let PDF_Width = HTML_Width + (top_left_margin * 2);
   let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
   let canvas_image_width = HTML_Width;
   let canvas_image_height = HTML_Height;
   let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
   canvas.getContext('2d');
   let imgData = canvas.toDataURL("image/jpeg", 1.0);
   let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
   for (let i = 1; i <= totalPDFPages; i++) {
     pdf.addPage([PDF_Width, PDF_Height], 'p');
     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
   }
    pdf.save("HTML-Document.pdf");
 });
}


}
