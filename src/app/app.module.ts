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

import { ToastrModule } from 'ngx-toastr';

import {CdkTableModule} from '@angular/cdk/table'; 
import { DatePipe } from '@angular/common';

import {NgxPrintModule} from 'ngx-print';
import { MatDialogModule } from '@angular/material/dialog';
import { AjouterPreparationComponent } from './client/ajouter-preparation/ajouter-preparation.component';
import { HomeComponent } from './client/home/home.component';
import { InfoPersonneComponent } from './client/info-personne/info-personne.component';
import { ListeprofilComponent } from './client/listeprofil/listeprofil.component';
import { LoginComponent } from './client/login/login.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { EditInfoImpressionComponent } from './client/paramètrecompte/edit-info-impression/edit-info-impression.component';
import { EditcompteComponent } from './client/paramètrecompte/editcompte/editcompte.component';
import { PatientsDialogComponent } from './client/patients-dialog/patients-dialog.component';
import { PrescriptionComponent } from './client/prescription/prescription.component';
import { RegisterComponent } from './client/register/register.component';
import { ChangePasswordComponent } from './client/reset/change-password/change-password.component';
import { VerifaccountComponent } from './client/reset/verifaccount/verifaccount.component';
import { AuthGuardService } from './client/Services/auth-guard.service';
import { AddPatientService } from './client/Services/Rest-patient.service';
import { AuthService } from './client/Services/RestUser.service';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';



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
    ToastrModule.forRoot(),
    CdkTableModule,
    NgxPrintModule,
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
AuthGuardService],

  bootstrap: [AppComponent],
  entryComponents: [PrescriptionComponent]

})
export class AppModule { }
