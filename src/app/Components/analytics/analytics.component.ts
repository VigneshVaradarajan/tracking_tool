import { Component, OnInit } from '@angular/core';

import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  faChartPie = faChartPie;
  faChartBar = faChartBar;

  constructor() { }

  ngOnInit() {
  }

}
