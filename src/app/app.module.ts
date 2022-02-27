import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavmenuComponent } from './shared/navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { FormControl, FormControlName, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { RechercheprofilModule } from './rechercheprofil/rechercheprofil.module';
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
import { DernierePrescComponent } from './derniere-presc/derniere-presc.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AjoutformComponent } from './Stepper/ajoutform/ajoutform.component';
import {MatStepContent, MatStepLabel, MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavmenuComponent,
    HomeComponent,
    ListeprofilComponent,
    ParametreComponent,
  
  RechercheformComponent,
  EditcompteComponent,
  EditInfoImpressionComponent,
  GestionComplementComponent,
  PreparationComponent,
  ComplementsComponent,
  ProduitsComponent,
  InfoComponent,
  DernierePrescComponent,
  LoginComponent,
   AjoutformComponent
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
   
    RechercheprofilModule,
    MatFormFieldModule,
    MatInputModule,
  MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatExpansionModule
    
   
  ],
  providers: [
  AuthService,
  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
