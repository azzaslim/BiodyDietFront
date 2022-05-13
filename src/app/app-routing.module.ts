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
import { AHomeComponent } from './admin/a-home/a-home.component';

import { ChildGuard } from './guard/Admin.guard';
import { AuthGuardService } from './guard/auth-guard.service';
import { ListeUsersComponent } from './admin/a-users/liste-users/liste-users.component';
import { DetailUserComponent } from './admin/a-users/detail-user/detail-user.component';
import { EditUserComponent } from './admin/a-users/edit-user/edit-user.component';
import { ListeGroupesComponent } from './admin/a-groupes/liste-groupes/liste-groupes.component';
import { EditGroupeComponent } from './admin/a-groupes/edit-groupe/edit-groupe.component';
import { DetailGroupeComponent } from './admin/a-groupes/detail-groupe/detail-groupe.component';
import { UserGuard } from './guard/User.guard';
import { EditNutrientComponent } from './admin/nutrient/edit-nutrient/edit-nutrient.component';
import { AddUserComponent } from './admin/a-users/add-user/add-user.component';
import { AddPatientComponent } from './admin/add-patient/add-patient.component';
import { PrescriptComponent } from './admin/ModulePrescription/prescript/prescript.component';
import { AddsymptomComponent } from './admin/symptom/addsymptom/addsymptom.component';
import { SymptommanageComponent } from './admin/symptom/symptommanage/symptommanage.component';
import { ListQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/list-questionnaire/list-questionnaire.component';
import { AddQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/add-questionnaire/add-questionnaire.component';
import { DetailQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/detail-questionnaire/detail-questionnaire.component';
import { EditQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/edit-questionnaire/edit-questionnaire.component';
import { ListAnswersComponent } from './admin/ModuleQuestionnaire/Answers/list-answers/list-answers.component';
import { AddAnswersComponent } from './admin/ModuleQuestionnaire/Answers/add-answers/add-answers.component';
import { DetailAnswersComponent } from './admin/ModuleQuestionnaire/Answers/detail-answers/detail-answers.component';
import { EditAnswersComponent } from './admin/ModuleQuestionnaire/Answers/edit-answers/edit-answers.component';
import { HomeMQuestionnaireComponent } from './admin/ModuleQuestionnaire/home-m-questionnaire/home-m-questionnaire.component';






const routes: Routes = [
  { path: 'home', component: HomeComponent  , canActivate : [AuthGuardService,UserGuard]},
  { path: 'listeprofil', component: ListeprofilComponent , canActivate : [AuthGuardService ,UserGuard]  },
  { path: 'parametre', component: ParametreComponent , canActivate : [AuthGuardService]  },
  { path: 'editCompte', component: EditcompteComponent , canActivate : [AuthGuardService] },
  { path: 'editImpression', component: EditInfoImpressionComponent , canActivate : [AuthGuardService] },
  { path: 'gestion', component: GestionComplementComponent , canActivate : [AuthGuardService] },
  { path: 'admin/symptom/symptomlist', component: SymptommanageComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/nutrient/nutrientlist', component: NutrientComponent, canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/symptom/addsymptom', component: AddsymptomComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/nutrient/addnutrient', component: AddNutrientComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'produits', component: ProduitsComponent , canActivate : [AuthGuardService] },
  { path: 'preparations', component: PreparationComponent , canActivate : [AuthGuardService] },
  { path: 'complements', component: ComplementsComponent , canActivate : [AuthGuardService] },
  { path: 'info/:id', component: InfoPersonneComponent , canActivate : [AuthGuardService] },
  { path: 'admin/nutrient/nutrientdetails/:id', component: NutrientdetailsComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path:  'admin/nutrient/editnutrient', component: EditNutrientComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: '', component: LoginComponent   },
  { path: 'register', component:RegisterComponent},
  { path: 'verification', component:VerifaccountComponent  },
  { path: 'reset/:token', component:ChangePasswordComponent   },
  { path: 'ajoutpreparation', component: AjouterPreparationComponent , canActivate : [AuthGuardService]},
  { path: 'ajout', component: PrescriptionComponent   , canActivate : [AuthGuardService]  },
 { path: 'presc', component: PrescriptionComponent , canActivate : [AuthGuardService] },
 //********************************************************************************************* */
 { path: 'admin/home', component: AHomeComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/users/listeusers', component: ListeUsersComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/users/edituser', component: EditUserComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/users/consultuser', component: DetailUserComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/users/adduser', component: AddUserComponent , canActivate : [AuthGuardService,ChildGuard]  },

 { path: 'admin/addPatient', component: AddPatientComponent , canActivate : [AuthGuardService,ChildGuard]  },

 { path: 'admin/ModulePrescription/Prescript', component:  PrescriptComponent, canActivate : [AuthGuardService,ChildGuard]  },


 { path: 'admin/groupes/listegroupes', component: ListeGroupesComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/groupes/editgroupe', component: EditGroupeComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/groupes/consultgroupe', component: DetailGroupeComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/ajout', component: PrescriptionComponent   , canActivate : [AuthGuardService,ChildGuard]  },
  
  { path: 'admin/gestion', component: GestionComplementComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/produits', component: ProduitsComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/preparations', component: PreparationComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/complements', component: ComplementsComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/ajoutpreparation', component: AjouterPreparationComponent , canActivate : [AuthGuardService,ChildGuard]},


  { path: 'admin/questionnaire/Listequestionnaire', component: ListQuestionnaireComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/questionnaire/addquestionnaire', component: AddQuestionnaireComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/questionnaire/Detailquestionnaire', component: DetailQuestionnaireComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/questionnaire/Editquestionnaire', component: EditQuestionnaireComponent , canActivate : [AuthGuardService,ChildGuard] },

  { path: 'admin/answers/Listeanswers', component: ListAnswersComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/answers/addanswers', component: AddAnswersComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/answers/Detailanswer', component: DetailAnswersComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/answers/Editanswer', component: EditAnswersComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/ModuleQuestionnaire', component: HomeMQuestionnaireComponent , canActivate : [AuthGuardService,ChildGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [ListeprofilComponent, 
  HomeComponent, ]