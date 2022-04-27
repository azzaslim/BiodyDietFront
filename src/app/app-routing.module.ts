import { NutrientdetailsComponent } from './admin/nutrient/nutrientdetails/nutrientdetails.component';
import { NutrientComponent } from './admin/nutrient/nutrient/nutrient.component';
import { AddNutrientComponent } from './admin/nutrient/add-nutrient/add-nutrient.component';
import { AjouterPreparationComponent } from './client/ajouter-preparation/ajouter-preparation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComplementComponent } from './client/gestion/gestion-complement/gestion-complement.component';
import { ProduitsComponent } from './client/gestion/produits/produits.component';
import { PreparationComponent } from './client/gestion/preparation/preparation.component';
import { ComplementsComponent } from './client/gestion/complements/complements.component';
import { HomeComponent } from './client/home/home.component';
import { InfoPersonneComponent } from './client/info-personne/info-personne.component';
import { ListeprofilComponent } from './client/listeprofil/listeprofil.component';
import { LoginComponent } from './client/login/login.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { EditInfoImpressionComponent } from './client/paramètrecompte/edit-info-impression/edit-info-impression.component';
import { EditcompteComponent } from './client/paramètrecompte/editcompte/editcompte.component';
import { PrescriptionComponent } from './client/prescription/prescription.component';
import { RegisterComponent } from './client/register/register.component';
import { ChangePasswordComponent } from './client/reset/change-password/change-password.component';
import { VerifaccountComponent } from './client/reset/verifaccount/verifaccount.component';
import { AuthGuardService } from './client/Services/auth-guard.service';
import { AddsymptomComponent } from './admin/symptom/addsymptom/addsymptom.component';
import { SymptommanageComponent } from './admin/symptom/symptommanage/symptommanage.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate : [AuthGuardService]  },
  { path: 'listeprofil', component: ListeprofilComponent , canActivate : [AuthGuardService]  },
  { path: 'parametre', component: ParametreComponent , canActivate : [AuthGuardService]  },
  { path: 'editCompte', component: EditcompteComponent , canActivate : [AuthGuardService] },
  { path: 'editImpression', component: EditInfoImpressionComponent , canActivate : [AuthGuardService] },
  { path: 'gestion', component: GestionComplementComponent , canActivate : [AuthGuardService] },
  { path: 'symptom', component: SymptommanageComponent , canActivate : [AuthGuardService] },
  { path: 'nutrient', component: NutrientComponent, canActivate : [AuthGuardService] },
  { path: 'addsymptom', component: AddsymptomComponent , canActivate : [AuthGuardService] },
  { path: 'addnutrient', component: AddNutrientComponent , canActivate : [AuthGuardService] },
  { path: 'produits', component: ProduitsComponent , canActivate : [AuthGuardService] },
  { path: 'preparations', component: PreparationComponent , canActivate : [AuthGuardService] },
  { path: 'complements', component: ComplementsComponent , canActivate : [AuthGuardService] },
  { path: 'info/:id', component: InfoPersonneComponent , canActivate : [AuthGuardService] },
  { path: 'nutrientdetails/:id', component: NutrientdetailsComponent , canActivate : [AuthGuardService] },
  { path: '', component: LoginComponent   },
  { path: 'register', component:RegisterComponent},
  { path: 'verification', component:VerifaccountComponent  },
  { path: 'reset/:token', component:ChangePasswordComponent   },
  { path: 'ajoutpreparation', component: AjouterPreparationComponent , canActivate : [AuthGuardService]},
  { path: 'ajout', component: PrescriptionComponent   , canActivate : [AuthGuardService]  },
 { path: '**', component: PrescriptionComponent , canActivate : [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
