import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

declare var require: any;
const RandExp = require('randexp');
var UsaStates = require('usa-states').UsaStates;

/* Validation function for Key field */
function phoneFormat(control: FormControl) {

}

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {

  public acquisitionID: string;
  public stateNames = [];
  public industryList = [];
  addForm: FormGroup;

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

  /* Creating the form using the FormBuilder service provided by Angular. */
  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      company_name: ['', Validators.required],
      headquaters: ['', Validators.required],
      industry: ['', Validators.required],
      // contact_details: formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      // }),
      // financial: formBuilder.group({
      revenue: ['', Validators.required],
      revenue_costs: ['', Validators.required],
      profit: ['', Validators.required],
      price: ['', Validators.required],
      // }),
      status: ['', Validators.required],
      acquisitionYear: ['', Validators.required],
      valuePayment: ['', Validators.required]
    });
  }

  getErrorMessage() {
    console.log(this.status.hasError('required'))
    return this.status.hasError('required') ? 'You must enter a value' : 'jhujgf';
  }

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<OverlayComponent>) {
    if (data) {
      this.industryList = data;
    }
    var usStates = new UsaStates();
    this.stateNames = usStates.arrayOf('names');
    this.addForm = this.createFormGroupWithBuilder(formBuilder)
  }

  ngOnInit() {
    let rand: string = new RandExp(/[A-Z]{2}/g).gen() + "-" + new RandExp(/[0-9]{2}/g).gen() + "-" + new RandExp(/[a-z]{2}/).gen();
    this.acquisitionID = rand;

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
    console.log(this.addForm.value)
    console.log(this.headquaters.value)
  }
}