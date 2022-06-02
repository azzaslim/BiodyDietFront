import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavmenuComponent } from './shared/navmenu/navmenu.component';
import { FormControl, FormControlName, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatRowDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { GestionComplementComponent } from './client/gestion/gestion-complement/gestion-complement.component';
import { PreparationComponent } from './client/gestion/preparation/preparation.component';
import { ComplementsComponent } from './client/gestion/complements/complements.component';
import { ProduitsComponent } from './client/gestion/produits/produits.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatStepContent, MatStepLabel, MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkTableModule} from '@angular/cdk/table';

import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './client/home/home.component';
import { ListeprofilComponent } from './client/listeprofil/listeprofil.component';
import { LoginComponent } from './client/login/login.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { EditInfoImpressionComponent } from './client/paramètrecompte/edit-info-impression/edit-info-impression.component';
import { EditcompteComponent } from './client/paramètrecompte/editcompte/editcompte.component';
import { PatientsDialogComponent } from './client/patients-dialog/patients-dialog.component';
import { RestUserService } from './client/Services/RestUser.service';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { PrescriptionComponent } from './client/prescription/prescription.component';
import { AjouterPreparationComponent } from './client/ajouter-preparation/ajouter-preparation.component';
import { InfoPersonneComponent } from './client/info-personne/info-personne.component';
import { RegisterComponent } from './client/register/register.component';
import { ChangePasswordComponent } from './client/reset/change-password/change-password.component';
import { VerifaccountComponent } from './client/reset/verifaccount/verifaccount.component';

import { AHomeComponent } from './admin/a-home/a-home.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { AdminGuard } from './guard/Admin.guard';
import { ListeUsersComponent } from './admin/a-users/liste-users/liste-users.component';
import { ListeGroupesComponent } from './admin/a-groupes/liste-groupes/liste-groupes.component';
import { DetailUserComponent } from './admin/a-users/detail-user/detail-user.component';
import { EditUserComponent } from './admin/a-users/edit-user/edit-user.component';
import { DetailGroupeComponent } from './admin/a-groupes/detail-groupe/detail-groupe.component';
import { EditGroupeComponent } from './admin/a-groupes/edit-groupe/edit-groupe.component';
import { AddNutrientComponent } from './admin/nutrient/add-nutrient/add-nutrient.component';
import { NutrientComponent } from './admin/nutrient/nutrient/nutrient.component';

import { NutrientdetailsComponent } from './admin/nutrient/nutrientdetails/nutrientdetails.component';
import { EditNutrientComponent } from './admin/nutrient/edit-nutrient/edit-nutrient.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { AddUserComponent } from './admin/a-users/add-user/add-user.component';
// or
import {MatRadioModule} from '@angular/material/radio';
import { AddPatientComponent } from './admin/add-patient/add-patient.component';
import { PrescriptComponent } from './admin/ModulePrescription/prescript/prescript.component';
import { RestPatientService } from './client/Services/Rest-patient.service';
import { FooterComponent } from './shared/footer/footer.component';
import { RestNutrientService } from './client/Services/rest-nutrient.service';
import { RestSymptomService } from './client/Services/rest-symptom.service';
import { ListQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/list-questionnaire/list-questionnaire.component';
import { AddQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/add-questionnaire/add-questionnaire.component';
import { DetailQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/detail-questionnaire/detail-questionnaire.component';
import { AddAnswersComponent } from './admin/ModuleQuestionnaire/Answers/add-answers/add-answers.component';
import { DetailAnswersComponent } from './admin/ModuleQuestionnaire/Answers/detail-answers/detail-answers.component';
import { ListAnswersComponent } from './admin/ModuleQuestionnaire/Answers/list-answers/list-answers.component';
import { AddsymptomComponent } from './admin/symptom/addsymptom/addsymptom.component';
import { SymptommanageComponent } from './admin/symptom/symptommanage/symptommanage.component';
import { EditQuestionnaireComponent } from './admin/ModuleQuestionnaire/Questionnaire/edit-questionnaire/edit-questionnaire.component';
import { EditAnswersComponent } from './admin/ModuleQuestionnaire/Answers/edit-answers/edit-answers.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeMQuestionnaireComponent } from './admin/ModuleQuestionnaire/home-m-questionnaire/home-m-questionnaire.component';
import { MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListeprofilComponent,
    ParametreComponent,
  EditcompteComponent,
  EditInfoImpressionComponent,
  GestionComplementComponent,
  PreparationComponent,
  ComplementsComponent,
  ProduitsComponent,
  LoginComponent,
   PrescriptionComponent,
   InfoPersonneComponent,
   RegisterComponent,
   AjouterPreparationComponent,
   VerifaccountComponent,
   ChangePasswordComponent,
   PatientsDialogComponent,
   AHomeComponent,
   ListeGroupesComponent,
   DetailUserComponent,
   EditUserComponent,
   DetailGroupeComponent,
   EditGroupeComponent,  
   SymptommanageComponent,
   AddsymptomComponent,
   AddNutrientComponent,
   NutrientdetailsComponent,   
   EditNutrientComponent,  
   AddUserComponent,
   AddPatientComponent,
   PrescriptComponent,  
   NutrientComponent,
   ListeUsersComponent,
   FooterComponent,
   NavmenuComponent,
   ChangePasswordComponent,
     
   NutrientComponent,
         AddUserComponent,
         AddPatientComponent,
         PrescriptComponent,
         ListQuestionnaireComponent,
         AddQuestionnaireComponent,
         DetailQuestionnaireComponent,
         ListAnswersComponent,
         AddAnswersComponent,
         DetailAnswersComponent,
         EditQuestionnaireComponent,
         EditAnswersComponent,
         HomeMQuestionnaireComponent,
         PrintLayoutComponent,
         InvoiceComponent,  
  ],
  imports: [
  
  MatListModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    MatFormFieldModule,
    MatInputModule,
  MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatExpansionModule,
    CdkTableModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    NgMultiSelectDropDownModule,
    MatOptionModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  
   


    



    
    

  ],
  providers: [
  RestUserService,
  RestPatientService,
  RestNutrientService,
  RestSymptomService,
  DatePipe,
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

  {
    
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  },
AuthGuardService,
AdminGuard,
  ],

  bootstrap: [AppComponent],
  entryComponents: [PrescriptionComponent]

})
export class AppModule { }