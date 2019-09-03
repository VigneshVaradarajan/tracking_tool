import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  private listSource = new BehaviorSubject([]);

  currentMessage = this.messageSource.asObservable();
  industryList = this.listSource.asObservable();

  constructor() { }

  setIndustryList(list: any) {
    this.listSource.next(list);
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
