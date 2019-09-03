import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  private listSource = new BehaviorSubject([]);

  currentMessage = this.messageSource.asObservable();
  industryList = this.listSource.asObservable();

  constructor(private http: HttpClient) { }

  setIndustryList(list: any) {
    this.listSource.next(list);
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getData() {
    return this.http.get("http://localhost:3000/details")
  }
}
