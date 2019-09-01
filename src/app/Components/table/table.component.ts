import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  columnDefs;
  rowData;
  private api;
  private paginationPageSize;
  private paramsVal;

  private gridOptions: GridOptions;

  private data: any;
  public colNames = [];
  public industryList = []
  overlayDialogRef: MatDialogRef<OverlayComponent>;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{};
  }

  onGridReady(params) {
    this.paramsVal = params
    this.api = params.api;

    // this.api.sizeColumnsToFit();

    // window.addEventListener("resize", function () {
    //   setTimeout(function () {
    //     params.api.sizeColumnsToFit();
    //   });
    // });

    this.http.get("http://localhost:3000/details").subscribe(response => {
      console.log(response)
      this.data = response;
      [this.colNames, this.industryList] = getData(this.data);

      this.columnDefs = this.generateColumns(this.colNames);
      this.gridOptions.columnDefs = this.columnDefs;
      this.gridOptions.api.setRowData(this.data);

      console.log(this.industryList)
    });

    this.gridOptions.defaultColDef = {
      sortable: true,
      resizable: true,
      editable: false
    }
    /* Setting the pagination size to 10 */
    this.paginationPageSize = 10;
  }

  /* Defining the dynamic columns from the keys */
  generateColumns(data: any[]) {
    let columnDefinitions = [];

    let initialColumn = {
      headerName: '',
      field: 'check',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 90,
      editable: false,
      colId: 'check'
    }
    columnDefinitions.push(initialColumn)
    data.forEach(element => {
      let mappedColumn = {
        headerName: element,
        field: element,
        colId: element
      }
      columnDefinitions.push(mappedColumn);
    });
    return columnDefinitions;
  }

  ngOnInit() {
  }

  onAdd(): void {
    this.overlayDialogRef = this.dialog.open(OverlayComponent, {
      width: '65%',
      // height: '50%',
      disableClose: true,
      data: this.industryList
    });
  }

}

/*handle if no data is present -- Getting all the keys present in the data obtained*/
function getData(items) {
  var keys = [];
  var industry = [];
  if (items.length != 0) {
    for (var i = 0; i < items.length; i++) {


      Object.keys(items[i]).forEach(function (key) {
        if (keys.indexOf(key) == -1) {
          keys.push(key);
        }
        if (industry.indexOf(items[i]['Industry']) == -1) {
          industry.push(items[i]['Industry']);
        }
      });
    }
  }
  return [keys, industry]
}


