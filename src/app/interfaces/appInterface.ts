
export interface IIdentityBasicInfo {
  firstname: string
  lastname: string
  password?: string
  genderTypeLookup?: number
  identityTypeLookup?: number
  email: string
  loginProviderName?: string
  providerKey?: string
  profilePictureTitle?: string
  profilePicturePath?: string
  isActive?: boolean
}
export interface IGetProfileResponse {
  profileData: IProfileData
}
export interface IProfileData {
  identityID: number
  firstname: string
  lastname: string
  email: string
  genderTypeID: number
  identityTypeLookup: number
  address1: string
  address2: string
  city: string
  state: number
  country: number
  province: string
  dateOfBirth: Date | string
  cnic: string
  clinicLocation: ILocationData
  phoneNumber: string
  mobileNumber: string
  profilePicture: string
  doctorID: number
  licenceNumberOrPMDCNumber: string
  issuingAuthority: string
  affiliatedOrganization: string
  clinicAddress1: string
  clinicAddress2: string
  clinicCity: string
  clinicProvince: string
  clinicEmail: string
  clinicPhoneNumber: string
  clinicMobileNumber: string
  clinicStartTime: string
  clinicEndTime: string
  onlineAppointmentStartTime: string | null
  onlineAppointmentEndTime: string | null
  numberOfPatientsCheckPerDay: number | null
  clinicDays: IClinicDayData[]
  specialities: IDoctorSpecialityData[]
  degrees: IDoctorDegreeData[]
  experiences:IDoctorExperienceData[]
  isActive: boolean

}
export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

export interface ILocationData {
  latitude: number | null
  longitude: number | null
}
export interface CurrentChat {
  ReceiverIdentityId: number
  SenderName: string
}

interface IClinicDayData {
  clinicDaysID: number
  name: string
  clinicDaysStatusID: number | null
  doctorID: number
}

export interface IDoctorExperienceData {
  doctorExperienceID: number
  xrefDoctorExperienceID: number
  hosiptalName: string
  doctorID: number
  fromInfo: string
  toInfo: string
  designation: string
}
export interface IIsProfileCompletedRequest {
  identityId: number
  isDoctor: boolean
  isPatient: boolean
  isVisitor: boolean
}
export interface IUserToken {
  Email: string
  IdentityDbId: string
  PrimaryEnterpriseDbId: string
  RoleDbId: string
  Rights: string[]
}
export interface IVerifyAccount {
  verificationCode: string
  email: string
}

export interface IVerificationCode {
  email: string
}

export interface IActivateAccount {
  identityId: number
  isActive: boolean
}
export interface IIsProfileCompletedResponse {
  completed: boolean
}
interface IApiPage<T> {
  items: T[]
  count: number
}
export interface IDoctorAppointmentHistoryData {
  medicalRecordID: number
  patientName: string
  appointmentDate: string
  appointmentNumber: number | null
  medicalRecordTypeLookup: number | null
  caseStatusLookup: number
  onlineAppointmentRequestTime: string
  onlineAppointmentModifiedTime: string
  patientIdentityID: number
  patientLocation: string
}
export interface IPatientAppointmentHistoryData {
  medicalRecordID: number
  doctorName: string
  doctorIdentityID: number | null
  appointmentDate: string
  appointmentNumber: number | null
  caseStatusLookup: number | null
  medicalRecordTypeLookup: number | null
  onlineAppointmentRequestTime: string
  onlineAppointmentModifiedTime: string
  medicalReportName: string
  creationDate: string
  patientMedicalReportID: number | null
}
export interface IMedicalRecordResponse {
  medicalRecordData: IMedicalRecordData
  patientName: string
  doctorName: string
  clinicContactNumber: string
}
export interface IMedicalRecordData {
  medicalRecordID: number
  creationDate: string | null
  appointmentDate: string
  visitedDate: string | null
  patientIdentityID: number
  doctorIdentityID: number | null
  guardianIdentityID: number | null
  caseStatusLookup: number
  patientFeedbackID: number | null
  medicalRecordTypeLookup: number | null
  patientRemarks: string
  parentMedicalRecordID: number | null
  height: number | null
  weight: number | null
  age: number | null
  disabilityTypeLookup: number | null
  completionDate: string | null
  onlineAppointmentRequestTime: string | null
  onlineAppointmentModifiedTime: string | null
  clinicAppointmentStartTime: string | null
  clinicAppointmentEndTime: string | null
  appointmentNumber: number | null
  symptoms: string
  briefHistory: string
  diagnosis: string
  prescription: string
}
export interface ILookupItem extends ILookupListEntry {
}
export interface ILookupListEntry {
  lookupIndex: number
  name: string
  description?: string
  isDisabled: boolean
}
export interface IUpdateDoctorDashboardAppointmentRequest {
  medicalRecordID: number
  caseStatusId: number
  diagnosis: string
  prescription: string
  onlineAppointmentModifiedTime: string | null
  medicalAttachment: IAttachmentData | null
}
export interface IAttachmentData {
  attachmentID?: number | null
  attachmentTypeLookup: number
  title: string
  referenceId?: number | null
  entityTypeLookup?: number | null
  path?: string | null
  note?: string | null
  creationDate?: string | null
  creatorIdentityID?: number | null
  medicalRecordID: number
}
export interface ITopRatedDoctors {
  doctorID: number
  doctorName: string
  doctorStarRatting: number
  latestDegreeTitle: string
  profileImageUrl: string
  availabletime: string
  fee: number
}
export interface ICountSpecility {
  name: string
  totalDoctors: number,

}

export interface ITopRatedDoctors {
  doctorID: number
  doctorName: string
  doctorStarRatting: number
  latestDegreeTitle: string
  profileImageUrl: string
  availabletime: string
  fee: number
}
export interface IProvinceLookupItem extends ILookupItem {
  countryLookup: number
}
 export interface IFilterService {
  (name: 'translate'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string;
  };

}
export enum CaseStatus {
  None = 0,
  Request = 1,
  Canceled = 2,
  Approved = 3,
  Completed = 4,
  NoMoreAppointments = 5,
  Pending = 6,
  Expired = 7
}
export interface ILookupItem extends ILookupListEntry {
}
export interface ILookupListEntry {
  lookupIndex: number
  name: string
  description?: string
  isDisabled: boolean
}

export interface IProvinceLookupItem extends ILookupItem {
  countryLookup: number
}
export interface IAddIdentityPhotosResponse {
  identityPhotoDBID: number
  identityID: number
  identityPhoto: string
}
export interface IGetIdentityPhotoResponse {
  identityPhotoID: number
  identityID: number
  identityPhoto: string
}
export interface IGetIdentityPhotosResponse {
  identityPhotos: IIdentityPhoto[]
}
export interface IAddIdentityPhotosRequest {
  identityID: number
  identityPhoto: string
  extention: string
}
export interface IAddIdentityPhotosResponse {
  identityPhotoDBID: number
  identityID: number
  identityPhoto: string
}

export interface IIdentityPhoto {
  identityPhotoDBID: number
  identityID: number
  identityPhoto: string
  archivedInd: boolean
  createdDateTime: string
  lastUpdatedDateTime: string
}
export interface IUpdatePersonalDetailRequest {
  firstname: string
  lastname: string
  email: string
  genderTypeID: number
  address1: string
  address2: string
  city: string
  province: string
  dateOfBirth: Date | string
  cnic: string
  phoneNumber: string
  mobileNumber: string
}
export interface IDoctorSpecialityData {
  doctorSpecialityID: number
  xrefDoctorSpecialityID: number
  name: string
  doctorID: number
  description: string
}

export interface IDoctorDegreeData {
  doctorDegreeID: number
  xrefDoctorDegreeID: number
  name: string
  doctorID: number
  description: string
}
