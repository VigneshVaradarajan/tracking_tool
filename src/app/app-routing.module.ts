import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './Components/table/table.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './Components/register/register.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component'
import { ProfitComponent } from './Components/analytics/profit/profit.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "home/details",
    component: TableComponent,
  },
  {
    path: "home/analytics",
    component: AnalyticsComponent,
  },
  {
    path: "home/analytics/status",
    component: ProfitComponent
  },
  {
    path: "home/analytics/status",
    component: ProfitComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    /* No path found */
    path: "**", component: TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
