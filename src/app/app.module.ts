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
import { ListeprofilComponent } from './shared/listeprofil/listeprofil.component';
import { ParametreComponent } from './shared/parametre/parametre.component';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { AjoutComponent } from './ajoutprescription/ajout/ajout.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire/questionnaire.component';
import { PrescriptionComponent } from './prescriptioncomple/prescription/prescription.component';
import { PrescriptioncompleModule } from './prescriptioncomple/prescriptioncomple.module';
import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { RechercheprofilModule } from './rechercheprofil/rechercheprofil.module';
import { ImpressionComponent } from './impression/impression/impression.component';
import { ImpressionModule } from './impression/impression.module';

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
  ImpressionComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    AjoutprescriptionModule,
    QuestionnaireModule,
    PrescriptioncompleModule,
    RechercheprofilModule,
    ImpressionModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
