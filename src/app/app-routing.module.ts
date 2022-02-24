import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutComponent } from './ajoutprescription/ajout/ajout.component';
import { ProgressivebarComponent } from './ajoutprescription/progressivebar/progressivebar.component';
import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire/questionnaire.component';

import { PrescriptionComponent } from './prescriptioncomple/prescription/prescription.component';
import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { ImpressionComponent } from './impression/impression/impression.component';
import { ListeprofilComponent } from './listeprofil/listeprofil.component';
import { ParametreComponent } from './parametre/parametre.component';
import { EditcompteComponent } from './paramètrecompte/editcompte/editcompte.component';
import { EditInfoImpressionComponent } from './paramètrecompte/edit-info-impression/edit-info-impression.component';
import { GestionComplementComponent } from './gestion/gestion-complement/gestion-complement.component';
import { ProduitsComponent } from './gestion/produits/produits.component';
import { PreparationComponent } from './gestion/preparation/preparation.component';
import { ComplementsComponent } from './gestion/complements/complements.component';
import { InfoComponent } from './personne/info/info.component';
import { DernierePrescComponent } from './derniere-presc/derniere-presc.component';

const routes: Routes = [
  { path: 'form', component: AjoutComponent },
  { path: '', component: HomeComponent },
  { path: 'listeprofil', component: ListeprofilComponent },
  { path: 'parametre', component: ParametreComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'prescription', component: PrescriptionComponent },
  { path: 'recherche', component: RechercheformComponent },
  { path: 'impression', component: ImpressionComponent },
  { path: 'editCompte', component: EditcompteComponent },
  { path: 'editImpression', component: EditInfoImpressionComponent },
  { path: 'gestion', component: GestionComplementComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'preparations', component: PreparationComponent},
  { path: 'complements', component: ComplementsComponent},
  { path: 'info', component: InfoComponent},
  { path: 'info/:id', component: InfoComponent},
  { path: 'info/:nom', component: InfoComponent},
  { path: 'dernierePresc', component: DernierePrescComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
