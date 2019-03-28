import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        TrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        AngularFirestoreModule
    ],
    exports: []
})
export class TrainingModule {}