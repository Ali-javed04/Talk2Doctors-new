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
}
