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
import { JwtInterceptor, ErrorInterceptor } from './_helpers';


import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule, MatMenuModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponentComponent } from './Components/edit-component/edit-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupModule } from '@progress/kendo-angular-popup';
import { StatusComponent } from './Components/status/status.component';
import { LoginComponent } from './Components/login/login.component';
import { backendProvider } from './_helpers/back-end';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { AngularSplitModule } from 'angular-split';
import { HeaderComponent } from './Components/header/header.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { ChartsModule } from 'ng2-charts';
import { ProfitComponent } from './Components/analytics/profit/profit.component';
import { ConfirmComponent } from './Components/confirm/confirm.component';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    OverlayComponent,
    EditComponentComponent,
    StatusComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    AnalyticsComponent,
    ProfitComponent,
    ConfirmComponent
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
    MatCardModule,
    FontAwesomeModule,
    PopupModule,
    AngularSplitModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule
  ],
  entryComponents: [OverlayComponent, ConfirmComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    backendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
