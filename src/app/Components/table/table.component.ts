import 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { OverlayComponent } from '../overlay/overlay.component';
// import { SimpleModalService } from 'ngx-simple-modal';
// import { DialogComponent } from '../dialog/dialog.component';
import { filter } from 'rxjs/operators';
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { StatusComponent } from '../status/status.component';
import { DataService } from "../../data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public totalNumOfRows: number;
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

  private searchValue;
  confirmResult = null;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    // private SimpleModalService: SimpleModalService
    private dataService: DataService
  ) {
    this.gridOptions = <GridOptions>{};

    this.gridOptions.columnDefs = [
      {
        headerName: "",
        cellRendererFramework: EditComponentComponent,
        colId: "edit",
        width: 80
      },
      {
        headerName: 'id',
        field: 'id',
        colId: 'id',
        width: 100
      },
      {
        headerName: 'Company Name',
        field: 'Company Name',
        colId: 'Company Name'
      },
      {
        headerName: 'Contact Details',
        children: [
          {
            headerName: 'Contact Person',
            field: 'Contact Person',
            colId: 'Contact Person',
          },
          {
            headerName: 'Contact Number',
            field: 'Contact Number',
            colId: 'Contact Number',
            columnGroupShow: 'closed',
            width: 130
          },
          {
            headerName: 'Contact Email',
            field: 'Contact Email',
            colId: 'Contact Email',
            columnGroupShow: 'closed'
          },
        ]
      },
      {
        headerName: 'Company Info',
        children: [
          {
            headerName: 'Headquarters',
            field: 'Headquarters',
            colId: 'Headquarters'
          },
          {
            headerName: 'Industry',
            field: 'Industry',
            colId: 'Industry',
            columnGroupShow: 'closed'
          },
          {
            headerName: 'Revenue Cost',
            field: 'Revenue Cost',
            colId: 'Revenue Cost',
            columnGroupShow: 'closed',
            width: 150
          },
          {
            headerName: 'Gross Profit',
            field: 'Gross Profit',
            colId: 'Gross Profit',
            columnGroupShow: 'closed',
            width: 100
          }
        ]
      },
      {
        headerName: 'Price',
        field: 'Price',
        colId: 'Price',
        width: 150
      },
      {
        headerName: 'Status',
        children: [
          {
            headerName: 'Status',
            field: 'Status',
            colId: 'Status',
            cellRendererFramework: StatusComponent
          },
          {
            headerName: 'Acquisition Year',
            field: 'Acquisition Year',
            colId: 'Acquisition Year',
            columnGroupShow: 'closed',
            width: 150
          },
          {
            headerName: 'Payment',
            field: 'Payment',
            colId: 'Payment',
            columnGroupShow: 'closed',
            width: 100
          }
        ]
      }
    ]
  }

  onGridReady(params) {
    this.paramsVal = params
    this.api = params.api;

    this.dataService.getData().subscribe(response => {
      this.data = response;
      [this.colNames, this.industryList] = getData(this.data);

      // this.columnDefs = this.generateColumns(this.colNames);
      // this.gridOptions.columnDefs = this.columnDefs;
      this.gridOptions.api.setRowData(this.data);

      this.dataService.setIndustryList(this.industryList)

      this.totalNumOfRows = this.api.getDisplayedRowCount();

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
      headerName: "Action",
      cellRendererFramework: EditComponentComponent,
      colId: "edit"
    }
    // let initialColumn1 = {
    //   headerName: '',
    //   field: 'check',
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 90,
    //   editable: false,
    //   colId: 'check'
    // }
    columnDefinitions.push(initialColumn)
    // columnDefinitions.push(initialColumn1)

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
      data: []
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

        let a = [];
        a.push(arr);
        this.api.updateRowData({
          add: a,
          addIndex: 0
        });
        this.postDataToServe(arr);
      });
  }

  postDataToServe(da) {
    this.http.post("http://localhost:3000/details/", da
    ).subscribe(response => {
      // console.log(response)
    })
  }

  search() {
    try {
      this.gridOptions.api.setQuickFilter(this.searchValue);
    }
    catch (e) {
      console.log(e);
    }
  }

  popoverClose() {
    var popover = document.getElementById('popover');
    console.log(popover);
  }

  /* For hiding/showing the columns */
  checkCheckBoxvalue(event, columns) {
    console.log(event + columns)
    const checked = event.checked;
    this.gridOptions.columnApi.setColumnVisible(columns, checked)
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


