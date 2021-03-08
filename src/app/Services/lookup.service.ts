import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ILookupItem, IProvinceLookupItem } from '../interfaces/appInterface';
import { BaseNgX } from './base-ngx/base-ngx'

@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseNgX {
  public apiPath: string = 'lookuplists/generic'
  public _data: any = undefined
  public get data(): any {
    if (_.isNil(this._data)) {
      const serializedLookupList = localStorage.getItem('LookupList')
      this._data = _.isNil(serializedLookupList)
        ? []
        : JSON.parse(serializedLookupList)
    }
    return this._data
  }
  public set data(data: any) {
    this.returnList.cache = new _.memoize.Cache
    this._data = data
    localStorage.setItem('LookupList', JSON.stringify(data))
  }
  private dataPromise: Promise<any>

  public get hasData(): boolean {
    return !_.isEmpty(this.data)
  }

  public timezones: any[] = []
  public phoneProviders: any[] = []
  public returnList: ((index: any) => any) & _.MemoizedFunction



  constructor( private Http: HttpClient,

  ) {
    super()
    this.returnList = _.memoize(this.memoizedReturnList)
  }
  public memoizedReturnList(index): any {
    const list = this.data[index] !== undefined ? this.data[index].listEntries : []
    return list.filter(item => !item.isDisabled)
  }
  public getLookupList(key: string): number {
    return _.findIndex(this.data, { 'name': key })
  }


  public getAnswerStatuses(): ILookupItem[] {
    return this.returnList(this.getLookupList('AnswerStatu'))
  }

  public getAttachmentTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('AttachmentType'))
  }

  public getCaseStatuses(): ILookupItem[] {
    return this.returnList(this.getLookupList('CaseStatus'))
  }

  public getCategories(): ILookupItem[] {
    return this.returnList(this.getLookupList('Category'))
  }

  public getChatTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('ChatType'))
  }

  public getCities(): ILookupItem[] {
    return this.returnList(this.getLookupList('City'))
  }

  public getClinicDayStatuses(): ILookupItem[] {
    return this.returnList(this.getLookupList('ClinicDayStatu'))
  }

  public getCountries(): ILookupItem[] {
    return this.returnList(this.getLookupList('Country'))
  }

  public getDegreeTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('DegreeType'))
  }

  public getDisabilityTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('DisabilityType'))
  }

  public getEntityTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('EntityType'))
  }

  public getGenderTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('GenderType'))
  }

  public getGradingTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('GradingType'))
  }

  public getIdentityTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('IdentityType'))
  }

  public getMedicalReportTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('MedicalReportType'))
  }

  public getMedicalRecordTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('MedicalRecordType'))
  }

  public getMessageStatuses(): ILookupItem[] {
    return this.returnList(this.getLookupList('MessageStatu'))
  }

  public getPatientFeedbackTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('PatientFeedbackType'))
  }

  public getProvinces(): IProvinceLookupItem[] {
    return this.returnList(this.getLookupList('State'))
  }

  public getQuestionStatuses(): ILookupItem[] {
    return this.returnList(this.getLookupList('QuestionStatu'))
  }

  public getQuestionTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('QuestionType'))
  }

  public getSliderTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('SliderType'))
  }

  public getSpecialityTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('SpecialityType'))
  }

  public getSurveyQuestionTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('SurveyQuestionType'))
  }

  public getSurveyTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('SurveyType'))
  }

  public getValueTypes(): ILookupItem[] {
    return this.returnList(this.getLookupList('ValueType'))
  }


  public getLookupItemByLookup<T extends ILookupItem>(lookups: T[], lookupIndex: number): T {
    return _.find(lookups, lookup => lookup.lookupIndex === lookupIndex);
  }

  public getStatesByCountry(countryLookup: number): IProvinceLookupItem[] {
    return _.filter(this.getProvinces(), state => state.countryLookup === countryLookup)
  }
  public getNameValue<T extends ILookupItem>(lookupList: T[], lookupIndex: number, defaultIfNotFound?: string): string {
    const match = this.getLookupItemByLookup(lookupList, lookupIndex)
    if (!_.isEmpty(match)) {
      return match.name
    }

  }

}
