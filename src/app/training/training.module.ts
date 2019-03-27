import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,      
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFirestoreModule
    ],
    exports: []
})
export class TrainingModule {}