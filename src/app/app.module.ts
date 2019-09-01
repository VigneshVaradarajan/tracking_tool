import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//noerrorschema - tells the compiler not to error based on unknown elements in mdbootstrap
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import { OverlayComponent } from './Components/overlay/overlay.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AgGridModule.withComponents([]),
    HttpClientModule,
    MatDialogModule,
    LayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  entryComponents: [OverlayComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
