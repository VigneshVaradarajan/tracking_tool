import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverlayComponent } from '../overlay/overlay.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent {

  private params: any;
  overlayDialogRef: MatDialogRef<OverlayComponent>;

  agInit(params: any): void {
    this.params = params;
  }

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {

  }

  onDelete() {
    // console.log(this.params.api)
    var selectedData = [];
    selectedData.push(this.params.node.data);
    // console.log(this.params.node.data) //this.params.node.rowIndex
    this.params.api.updateRowData({ remove: selectedData });

    /* Create a key array with all the selected keys to send as parameter to endpoint */
    var keys = this.params.node.data['id']

    var url = "http://localhost:3000/details/" + keys
    /* HTTP DELETE */
    this.httpClient.delete(url)
      .subscribe(
        result => {
          // alert("Successfully Deleted");
          // console.log(result)
        },
        err => console.error(err)
      );
  }

  onEdit() {
    this.overlayDialogRef = this.dialog.open(OverlayComponent, {
      width: '65%',
      // height: '50%',
      disableClose: true,
      data: this.params.node.data
    });

    this.overlayDialogRef
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {

        let arr = {};

        arr['id'] = name['Acquisition ID']
        arr['Company Name'] = name['company_name']
        arr['Industry'] = name['industry']
        arr['Contact Person'] = name['firstName'] + " " + name['lastName']
        arr['Contact Number'] = name['phone']
        arr['Contact Email'] = name['email']
        arr['Headquarters'] = name['headquaters']
        arr['Revenue Costs'] = name['revenue_costs']
        arr['Gross Profit'] = name['profit']
        arr['Status'] = name['status']
        arr['Acquisition Year'] = name['acquisitionYear']
        arr['Payment'] = name['valuePayment']
        arr['Price'] = name['price']

        // let a = [];
        // a.push(arr);
        // console.log(this.params.node)
        // // this.params.api.updateRowData({update: a});

        // let id = this.params.node.data

        var rowNode = this.params.node
        // console.log(rowNode)
        rowNode.setData(arr)
        // console.log(this.params.api.getRowNode(id))
        this.postDataToServe(arr);
      });
  }

  // setDataOnFord() {
  //   var rowNode = this.gridApi.getRowNode("bb");
  //   var newPrice = Math.floor(Math.random() * 100000);
  //   var newModel = "T-" + Math.floor(Math.random() * 1000);
  //   var newData = {
  //     id: "bb",
  //     make: "Ford",
  //     model: newModel,
  //     price: newPrice
  //   };
  //   rowNode.setData(newData);
  // }

  postDataToServe(da) {
    var keys = this.params.node.data['id']

    var url = "http://localhost:3000/details/" + keys

    // console.log(url)
    this.httpClient.put(url, da
    ).subscribe(response => {
      // console.log(response)
    })
  }

}
