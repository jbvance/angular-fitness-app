import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


import { AuthService } from '../auth.service';
import { UIService } from './../../shared/ui.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    //require user to be at least 18 years old
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy() {
    if(this.loadingSubs) this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
