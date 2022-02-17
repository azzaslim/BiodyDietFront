import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutComponent } from './ajoutprescription/ajout/ajout.component';
import { ProgressivebarComponent } from './ajoutprescription/progressivebar/progressivebar.component';
import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire/questionnaire.component';
import { ListeprofilComponent } from './shared/listeprofil/listeprofil.component';
import { ParametreComponent } from './shared/parametre/parametre.component';
import { PrescriptionComponent } from './prescriptioncomple/prescription/prescription.component';
import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { ImpressionComponent } from './impression/impression/impression.component';

const routes: Routes = [
  { path: 'form', component: AjoutComponent },
  { path: '', component: HomeComponent },
  { path: 'listeprofil', component: ListeprofilComponent },
  { path: 'parametre', component: ParametreComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'prescription', component: PrescriptionComponent },
  { path: 'recherche', component: RechercheformComponent },
  { path: 'impression', component: ImpressionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
