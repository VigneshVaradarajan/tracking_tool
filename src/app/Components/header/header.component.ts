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

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit() {

  }

}
