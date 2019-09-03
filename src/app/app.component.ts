import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tracking-tool';


  /*data: any;
  constructor(private http: HttpClient) {

    this.http.get("http://localhost:3000/details").subscribe(response => {
      var d = Object.entries(response);
      this.data = response;
      d.forEach(element => {
        // if (element[1]['gross_profit']) {
        //   delete element[1]['gross_profit'];
        // }
        // if (element[1]['status']) {
        //   delete element[1]['status'];
        // }
        // if (element[1]['acquisition_year']) {
        //   delete element[1]['acquisition_year'];
        // }
        // if (element[1]['value_payment']) {
        //   delete element[1]['value_payment'];
        // }

        element[1]['id'] = 1

        // if (element[1]['Revenue'] == 'n/a') {
        //   element[1]['Revenue'] = 'Undisclosed';
        // }
        // if (element[1]['Market Category'] == 'n/a') {
        //   element[1]['Market Category'] = 'Undisclosed';
        // }
        // element[1]['Gross Profit'] = Math.floor(Math.random() * 100) + 1 + '%';
        // var textArray = ['Approved', 'Pending', 'Proposed', 'Researching', 'Terminated'];
        // var randomNumber = Math.floor(Math.random() * textArray.length);
        // element[1]['Status'] = textArray[randomNumber];

        // var yearArray = ['2011', '2013', '2015', '2017', '2016', '2010'];
        // var randomNumberY = Math.floor(Math.random() * yearArray.length);

        // var valArray = ['Undisclosed', 'Cash', 'Bonds', 'Stocks'];
        // var randomNumberV = Math.floor(Math.random() * valArray.length);

        // if (element[1]['Status'] === 'Approved') {
        //   element[1]['Acquisition Year'] = yearArray[randomNumberY];
        //   element[1]['Value Payment'] = valArray[randomNumberV];
        // }
      })
      console.log(JSON.stringify(this.data));
    });
  }*/
}
