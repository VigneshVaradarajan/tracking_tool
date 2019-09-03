import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverlayComponent } from '../overlay/overlay.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent {
  public show_alert: boolean = false;
  public message: string;

  modalRef: NgbModalRef;

  private params: any;
  overlayDialogRef: MatDialogRef<OverlayComponent>;

  agInit(params: any): void {
    this.params = params;
  }

  constructor(private httpClient: HttpClient,
    public dialog: MatDialog,
    private _modalService: NgbModal) {

  }

  onDelete() {
    var selectedData = [];
    selectedData.push(this.params.node.data);

    this.modalRef = this._modalService.open(ConfirmComponent);
    this.modalRef.result.then(res => {
      console.log(res)
      if (res == 'Ok click') {
        this.params.api.updateRowData({ remove: selectedData });
        /* Create a key array with all the selected keys to send as parameter to endpoint */
        var keys = this.params.node.data['id']

        var url = "http://localhost:3000/details/" + keys
        /* HTTP DELETE */
        this.httpClient.delete(url)
          .subscribe(
            result => {
              alert("Successfully Deleted");
            },
            err => console.error(err)
          );
      }
    }, (reason) => {
      console.log(reason);
    })
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
        arr['Revenue Cost'] = name['revenue_costs']
        arr['Gross Profit'] = name['profit']
        arr['Status'] = name['status']
        arr['Acquisition Year'] = name['acquisitionYear']
        arr['Payment'] = name['valuePayment']
        arr['Price'] = name['price']

        var rowNode = this.params.node
        rowNode.setData(arr)
        this.postDataToServe(arr);
      });
  }

  postDataToServe(da) {
    var keys = this.params.node.data['id']

    var url = "http://localhost:3000/details/" + keys

    // console.log(url)
    this.httpClient.put(url, da
    ).subscribe(response => {
      alert("Successfully Edited");

    })
  }

}
