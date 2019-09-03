import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services'
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  faArrowCircleRight = faArrowCircleRight;

  loginForm: FormGroup;
  loading = false;
  submit = false;
  returnUrl: string;
  errorMsg: string;
  successMsg: string;

  /* Array of images for the carousel*/
  images = ['../../../assets/images/bg_1.png', '../../../assets/images/bg_2.png', '../../../assets/images/bg_3.jpg', '../../../assets/images/bg_4.jpg'];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  public registerBool: boolean = false;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  /* Functions for carousel toggle and slide */
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {
    /* Will route to the home page if admin is already logged in */
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // query param from the url
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    // show success message on registration
    if (this.activatedRoute.snapshot.queryParams['registered']) {
      this.successMsg = 'Yayy!! Successfully registered!!';
    }
  }

  // getter for the form fields
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submit = true;

    this.errorMsg = null;
    this.successMsg = null;

    // return if form invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errorMsg = error;
          this.loading = false;
        });
  }

  register() {
    this.registerBool = true;
  }
}