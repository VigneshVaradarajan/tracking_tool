import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  private params: any;
  public value: number;
  public type: string
  agInit(params: any): void {
    this.params = params;
    console.log(this.params.value)
  }

  constructor() { }

  ngOnInit() {
    if (this.params.value === 'Approved') {
      this.value = 100;
      this.type = "success";
    }
    else if (this.params.value === 'Terminated') {
      this.value = 100;
      this.type = "danger";
    }
    else if (this.params.value === 'Researching') {
      this.value = 30;
      this.type = "info";
    }
    else if (this.params.value === 'Proposed') {
      this.value = 50;
      this.type = "warning";
    }
    else if (this.params.value === 'Pending') {
      this.value = 75;
      this.type = "warning";
    }
  }

}
