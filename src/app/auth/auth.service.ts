import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';
import { UIService } from './../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
      private router: Router, 
      private afAuth: AngularFireAuth, 
      private trainingService: TrainingService,     
      private uiService: UIService) {}

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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);      
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        let snackBarRef = this.uiService.showSnackbar(error.message, 'Dismiss', 3000);
        snackBarRef.onAction().subscribe(() => {
          console.log('Snack bar action button was clicked');
        });
      });    
  }

  login(authData: AuthData) {
      this.uiService.loadingStateChanged.next(true);
      this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
   .then(result => {  
      this.uiService.loadingStateChanged.next(false);
      console.log(result);
   })
   .catch(error => {
    this.uiService.loadingStateChanged.next(false);
    let snackBarRef = this.uiService.showSnackbar(error.message, 'Dismiss', 3000);
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
