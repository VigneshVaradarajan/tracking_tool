import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from "../../data.service";
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

declare var require: any;
const RandExp = require('randexp');
var UsaStates = require('usa-states').UsaStates;

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {
  faUserCircle = faUserCircle;

  model: NgbDateStruct;
  today = this.calendar.getToday();

  public acquisitionID: string;
  public stateNames = [];
  public industryList = [];
  addForm: FormGroup;
  message: string;
  statusOptions: string[] = ['Researching', 'Proposed', 'Pending', 'Approved', 'Terminated'];
  paymentOptions: string[] = ['Cash', 'Bonds', 'Stocks', 'Undisclosed']

  filteredOptionsStates: Observable<string[]>;
  filteredOptionsIndustry: Observable<string[]>;
  filteredOptionsStatus: Observable<string[]>;
  filteredOptionsPayment: Observable<string[]>;

  phonePattern = /^\d{3}-\d{3}-\d{4}$/g
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  startDate = new Date(1990, 0, 1);
  startView = 'multi-year';
  statusGroupInitial = false;

  /* Creating the form using the FormBuilder service provided by Angular. */
  createFormGroupWithBuilder(formBuilder: FormBuilder, data) {
    return formBuilder.group({
      company_name: [data.length == 0 ? '' : data['Company Name'], Validators.required],
      headquaters: [data.length == 0 ? '' : data['Headquarters']],
      industry: [data.length == 0 ? '' : data['Industry']],
      // contact_details: formBuilder.group({
      firstName: [data.length == 0 ? '' : data['Contact Person'].split(" ")[0], Validators.required],
      lastName: [data.length == 0 ? '' : data['Contact Person'].split(" ")[1], Validators.required],
      phone: [data.length == 0 ? '' : data['Contact Number'],
      [Validators.required, Validators.pattern(this.phonePattern)]
      ],
      email: [data.length == 0 ? '' : data['Contact Email'],
      [Validators.required, Validators.pattern(this.emailPattern)]
      ],
      // }),
      // financial: formBuilder.group({
      // revenue: [data.length == 0 ? '' : data['Company Name'], Validators.required],
      revenue_costs: [data.length == 0 ? '' : data['Revenue Cost'], Validators.required],
      profit: [data.length == 0 ? '' : data['Gross Profit'], Validators.required],
      price: [data.length == 0 ? '' : data['Price'], Validators.required],
      // }),
      status: [data.length == 0 ? '' : data['Status'], Validators.required],
      acquisitionYear: [data.length == 0 ? '' : data['Acquisition Year'], Validators.required],
      valuePayment: [data.length == 0 ? '' : data['Payment'], Validators.required]
    });
  }

  getErrorMessage() {
    return this.status.hasError('required') ? 'You must enter a value' : 'jhujgf';
  }

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<OverlayComponent>,
    private dataService: DataService,
    private calendar: NgbCalendar) {
    if (data) {
      // this.industryList = data;
      // console.log(data)
      this.data = data
    }
    else {
      // console.log(data)
      this.data = undefined
    }
    var usStates = new UsaStates();
    this.stateNames = usStates.arrayOf('names');
    this.addForm = this.createFormGroupWithBuilder(formBuilder, this.data)
  }

  ngOnInit() {
    let rand: string = new RandExp(/[A-Z]{2}/g).gen() + "-" + new RandExp(/[0-9]{2}/g).gen() + "-" + new RandExp(/[a-z]{2}/).gen();
    this.acquisitionID = this.data.length == 0 ? rand : this.data['id'];

    // this.data.currentMessage.subscribe(message => this.message = message)
    this.dataService.industryList.subscribe(msg => {
      // console.log("sibling")
      // console.log(msg)
      this.industryList = msg;
    })

    this.filteredOptionsStates = this.headquaters.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterStates(value))
      );

    this.filteredOptionsIndustry = this.industry.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterIndustry(value))
      );

    this.filteredOptionsStatus = this.status.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterStatus(value))
      );
    this.filteredOptionsPayment = this.valuePayment.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterPayment(value))
      );

    this.formControlValueChanged();
  }

  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterIndustry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.industryList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterStatus(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.statusOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterPayment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.paymentOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  formControlValueChanged() {

    this.status.valueChanges.subscribe((mode: string) => {
      console.log(mode)
      if (mode === 'Approved') {
        document.getElementById('statusGroup').hidden = false;
        this.statusGroupInitial = true;
      }
      else {
        document.getElementById('statusGroup').hidden = true;
        this.statusGroupInitial = false;
      }
    })

  }

  get company_name() {
    return this.addForm.get('company_name')
  }

  get headquaters() {
    return this.addForm.get('headquaters')
  }

  get industry() {
    return this.addForm.get('industry')
  }

  get firstName() {
    return this.addForm.get('firstName')
  }

  get lastName() {
    return this.addForm.get('lastName')
  }

  get phone() {
    return this.addForm.get('phone')
  }

  get email() {
    return this.addForm.get('email')
  }

  get revenue() {
    return this.addForm.get('revenue')
  }

  get revenue_costs() {
    return this.addForm.get('revenue_costs')
  }

  get profit() {
    return this.addForm.get('profit')
  }

  get price() {
    return this.addForm.get('price')
  }

  get status() {
    return this.addForm.get('status')
  }

  get acquisitionYear() {
    return this.addForm.get('acquisitionYear')
  }

  get valuePayment() {
    return this.addForm.get('valuePayment')
  }

  onTabSelect(event) {
  }

  onSubmit() {
    // console.log(this.addForm.value)
    // console.log(this.headquaters.value)
    let arrayToSend = [];
    arrayToSend = (this.addForm.value)
    arrayToSend['Acquisition ID'] = this.acquisitionID;
    this.dialogRef.close(arrayToSend);
  }
}