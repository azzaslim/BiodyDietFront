import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AjoutprescriptionModule } from './ajoutprescription/ajoutprescription.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressivebarComponent } from './ajoutprescription/progressivebar/progressivebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavmenuComponent } from './shared/navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';

import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { AjoutComponent } from './ajoutprescription/ajout/ajout.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire/questionnaire.component';
import { PrescriptionComponent } from './prescriptioncomple/prescription/prescription.component';
import { PrescriptioncompleModule } from './prescriptioncomple/prescriptioncomple.module';
import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { RechercheprofilModule } from './rechercheprofil/rechercheprofil.module';
import { ImpressionComponent } from './impression/impression/impression.component';
import { ImpressionModule } from './impression/impression.module';
import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ListeprofilComponent } from './listeprofil/listeprofil.component';
import { ParametreComponent } from './parametre/parametre.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { EditcompteComponent } from './paramètrecompte/editcompte/editcompte.component';
import { EditInfoImpressionComponent } from './paramètrecompte/edit-info-impression/edit-info-impression.component';
import { GestionComplementComponent } from './gestion/gestion-complement/gestion-complement.component';
import { PreparationComponent } from './gestion/preparation/preparation.component';
import { ComplementsComponent } from './gestion/complements/complements.component';
import { ProduitsComponent } from './gestion/produits/produits.component';
import { InfoComponent } from './personne/info/info.component';
import { InfoService } from './personne/info.service';
import { DernierePrescComponent } from './derniere-presc/derniere-presc.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavmenuComponent,
    HomeComponent,
    ListeprofilComponent,
    ParametreComponent,
  ProgressivebarComponent,
  AjoutComponent,
  QuestionnaireComponent,
  PrescriptionComponent,
  RechercheformComponent,
  ImpressionComponent,
  EditcompteComponent,
  EditInfoImpressionComponent,
  GestionComplementComponent,
  PreparationComponent,
  ComplementsComponent,
  ProduitsComponent,
  InfoComponent,
  DernierePrescComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    AjoutprescriptionModule,
    QuestionnaireModule,
    PrescriptioncompleModule,
    RechercheprofilModule,
    ImpressionModule,
    MatFormFieldModule,
    MatInputModule,
  MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule
    
    
  ],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
