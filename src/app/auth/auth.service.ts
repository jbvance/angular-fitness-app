import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
      private router: Router, 
      private afAuth: AngularFireAuth, 
      private trainingService: TrainingService,
      private snackbar: MatSnackBar) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);    
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();     
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
   this.afAuth.auth.createUserWithEmailAndPassword(
     authData.email, 
     authData.password)
     .then(result => {
       console.log(result);      
     })
     .catch(error => {
       let snackBarRef = this.snackbar.open(error.message, 'Dismiss', {
         duration: 3000
       });
       snackBarRef.onAction().subscribe(() => {
         console.log('Snack bar action button was clicked');
       });
     });    
  }

  login(authData: AuthData) {
   this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
   .then(result => {    
    console.log(result);
   })
   .catch(error => {
    let snackBarRef = this.snackbar.open(error.message, 'Dismiss', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('Snack bar action button was clicked');
    });
   })    
  }

  logout() {     
    this.afAuth.auth.signOut();   
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
