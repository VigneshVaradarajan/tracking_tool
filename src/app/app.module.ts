import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//noerrorschema - tells the compiler not to error based on unknown elements in mdbootstrap
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import { OverlayComponent } from './Components/overlay/overlay.component';
// import { DialogComponent } from './Components/dialog/dialog.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatMenuModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponentComponent } from './Components/edit-component/edit-component.component';
// import { SimpleModalModule } from 'ngx-simple-modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupModule } from '@progress/kendo-angular-popup';
import { StatusComponent } from './Components/status/status.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    OverlayComponent,
    EditComponentComponent,
    StatusComponent,
    LoginComponent,
    // DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AgGridModule.withComponents([EditComponentComponent, StatusComponent]),
    HttpClientModule,
    MatDialogModule,
    LayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatCheckboxModule,
    // SimpleModalModule.forRoot({ container: "modal-container" }),
    FontAwesomeModule,
    PopupModule
  ],
  entryComponents: [OverlayComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
