import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  public convertStringToMomentDate(date: string): Date {
    return moment(date).toDate()
  }
  public convertToDateOnly(date: string): string {
    return moment(date).format('YYYY-MM-DD')
  }
}
