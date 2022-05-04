import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavmenuComponent } from './shared/navmenu/navmenu.component';
import { FormControl, FormControlName, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { GestionComplementComponent } from './client/gestion/gestion-complement/gestion-complement.component';
import { PreparationComponent } from './client/gestion/preparation/preparation.component';
import { ComplementsComponent } from './client/gestion/complements/complements.component';
import { ProduitsComponent } from './client/gestion/produits/produits.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatStepContent, MatStepLabel, MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkTableModule} from '@angular/cdk/table';
import { SymptommanageComponent } from './admin/symptom/symptommanage/symptommanage.component';
import { AddsymptomComponent } from './admin/symptom/addsymptom/addsymptom.component'; 
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './client/home/home.component';
import { ListeprofilComponent } from './client/listeprofil/listeprofil.component';
import { LoginComponent } from './client/login/login.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { EditInfoImpressionComponent } from './client/paramètrecompte/edit-info-impression/edit-info-impression.component';
import { EditcompteComponent } from './client/paramètrecompte/editcompte/editcompte.component';
import { PatientsDialogComponent } from './client/patients-dialog/patients-dialog.component';
import { AuthService } from './client/Services/RestUser.service';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { PrescriptionComponent } from './client/prescription/prescription.component';
import { AjouterPreparationComponent } from './client/ajouter-preparation/ajouter-preparation.component';
import { InfoPersonneComponent } from './client/info-personne/info-personne.component';
import { RegisterComponent } from './client/register/register.component';
import { ChangePasswordComponent } from './client/reset/change-password/change-password.component';
import { VerifaccountComponent } from './client/reset/verifaccount/verifaccount.component';
import { AddPatientService } from './client/Services/Rest-patient.service';

import { AHomeComponent } from './admin/a-home/a-home.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { ChildGuard } from './guard/Admin.guard';
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




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavmenuComponent,
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
   ListeUsersComponent,
   ListeGroupesComponent,
   DetailUserComponent,
   EditUserComponent,
   DetailGroupeComponent,
   EditGroupeComponent,  
   SymptommanageComponent,
   AddsymptomComponent,
   PatientsDialogComponent,
   AddNutrientComponent,
   NutrientComponent,
   NutrientdetailsComponent,  
   NutrientComponent, EditNutrientComponent,  
  ],
  imports: [
    MatListModule,
    BrowserModule,
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
    CdkTableModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [
  AuthService,
  AddPatientService,
  DatePipe,

  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  },
AuthGuardService,
ChildGuard],

  bootstrap: [AppComponent],
  entryComponents: [PrescriptionComponent]

})
export class AppModule { }
