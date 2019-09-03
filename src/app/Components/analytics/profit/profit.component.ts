import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../data.service";
import * as Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {

  chart: Chart;

  public chartType: string;
  public statusLabels = [];
  public statusData = [];
  public yearLabels = [];
  public yearData = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.chartType = params['type'];
    });

    this.dataService.getData().subscribe(res => {



      var response = Object.entries(res);

      if (this.chartType === 'status') {
        this.statusLabels = getKeys(res, 'Status');
        let t = 0, p = 0, r = 0, a = 0, pe = 0;
        response.forEach(element => {
          if (element[1]['Status'] === this.statusLabels[0]) {
            t += 1;
          }
          else if (element[1]['Status'] === this.statusLabels[1]) {
            p += 1;
          }
          else if (element[1]['Status'] === this.statusLabels[2]) {
            r += 1;
          }
          else if (element[1]['Status'] === this.statusLabels[3]) {
            pe += 1;
          }
          else if (element[1]['Status'] === this.statusLabels[4]) {
            a += 1;
          }
        });

        this.statusData = [t, p, r, a, pe];
        this.pieChart(this.statusLabels, this.statusData)
      }
      else if (this.chartType === 'year') {
        this.yearLabels = getKeys(res, 'Acquisition Year')
        var filtered = this.yearLabels.filter(function (el) {
          return el != null;
        });
        let y1 = 0, y2 = 0, y3 = 0, y4 = 0, y5 = 0, y6 = 0;
        response.forEach(element => {
          if (element[1]['Acquisition Year'] === filtered[0]) {
            y1 += 1;
          }
          else if (element[1]['Acquisition Year'] === filtered[1]) {
            y2 += 1;
          }
          else if (element[1]['Acquisition Year'] === filtered[2]) {
            y3 += 1;
          }
          else if (element[1]['Acquisition Year'] === filtered[3]) {
            y4 += 1;
          }
          else if (element[1]['Acquisition Year'] === filtered[4]) {
            y5 += 1;
          }
          else if (element[1]['Acquisition Year'] === filtered[5]) {
            y6 += 1;
          }
        });

        this.yearData = [y1, y2, y3, y4, y5, y6];
        this.barChart(filtered.sort(), this.yearData)
      }

    })

  }

  pieChart(labels, data) {
    this.chart = new Chart('canvas_status', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF4136', '#0074D9', '#FFCE56', '#E7E9ED', '#2ECC40']
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Color test'
        },
        legend: {
          position: 'right',
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 11
          }
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    });
  }

  barChart(labels, data) {
    this.chart = new Chart('canvas_year', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF4136', '#0074D9', '#FFCE56', '#E7E9ED', '#2ECC40', '#73E9EF']
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Color test'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];



  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }



}

/*handle if no data is present -- Getting all the keys present in the data obtained*/
function getKeys(items, type) {
  var keys = [];
  if (items.length != 0) {
    for (var i = 0; i < items.length; i++) {
      Object.keys(items[i]).forEach(function (key) {
        // if (keys.indexOf(key) == -1) {
        //   keys.push(key);
        // }
        if (keys.indexOf(items[i][type]) == -1) {
          keys.push(items[i][type]);
        }
      });
    }
  }
  return keys
}