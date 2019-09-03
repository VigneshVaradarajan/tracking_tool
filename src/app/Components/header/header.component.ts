import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { Router } from '@angular/router';

import { faDrawPolygon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faDrawPolygon = faDrawPolygon;

  loggedInUser: any;

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {
    //obtaining the logged in user, if any
    this.auth.currentUser.subscribe(x => this.loggedInUser = x);
  }

  /* loggin-out and routing back to the login page */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

}
