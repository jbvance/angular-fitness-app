import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [       
        ReactiveFormsModule,       
        AngularFireAuthModule,
        SharedModule
    ],    
})
export class AuthModule {}