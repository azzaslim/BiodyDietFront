import { AjouterPreparationComponent } from './ajouter-preparation/ajouter-preparation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RechercheformComponent } from './rechercheprofil/rechercheform/rechercheform.component';
import { ListeprofilComponent } from './listeprofil/listeprofil.component';
import { ParametreComponent } from './parametre/parametre.component';
import { EditcompteComponent } from './paramètrecompte/editcompte/editcompte.component';
import { EditInfoImpressionComponent } from './paramètrecompte/edit-info-impression/edit-info-impression.component';
import { GestionComplementComponent } from './gestion/gestion-complement/gestion-complement.component';
import { ProduitsComponent } from './gestion/produits/produits.component';
import { PreparationComponent } from './gestion/preparation/preparation.component';
import { ComplementsComponent } from './gestion/complements/complements.component';
import { InfoComponent } from './personne/info/info.component';
import { LoginComponent } from './login/login.component';
import { InfoPersonneComponent } from './info-personne/info-personne.component';
import { AuthGuardService } from './auth-guard.service';
import { PrescriptionComponent } from './prescription/prescription.component';
import { RegisterComponent } from './register/register.component';
import { VerifaccountComponent } from './reset/verifaccount/verifaccount.component';
import { ChangePasswordComponent } from './reset/change-password/change-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate : [AuthGuardService]  },
  { path: 'listeprofil', component: ListeprofilComponent , canActivate : [AuthGuardService]  },
  { path: 'parametre', component: ParametreComponent , canActivate : [AuthGuardService]  },
  { path: 'recherche', component: RechercheformComponent , canActivate : [AuthGuardService]  },
  { path: 'editCompte', component: EditcompteComponent , canActivate : [AuthGuardService] },
  { path: 'editImpression', component: EditInfoImpressionComponent , canActivate : [AuthGuardService] },
  { path: 'gestion', component: GestionComplementComponent , canActivate : [AuthGuardService] },
  { path: 'produits', component: ProduitsComponent , canActivate : [AuthGuardService] },
  { path: 'preparations', component: PreparationComponent , canActivate : [AuthGuardService] },
  { path: 'complements', component: ComplementsComponent , canActivate : [AuthGuardService] },
  { path: 'info', component: InfoComponent , canActivate : [AuthGuardService] },
  { path: 'info/:id', component: InfoPersonneComponent , canActivate : [AuthGuardService] },
  { path: 'info/:nom', component: InfoComponent , canActivate : [AuthGuardService] },
  { path: '', component: LoginComponent   },
  { path: 'register', component:RegisterComponent  },
  { path: 'verification', component:VerifaccountComponent  },
  { path: 'reset/:token', component:ChangePasswordComponent   },
  { path: 'ajoutpreparation', component: AjouterPreparationComponent , canActivate : [AuthGuardService]},
  { path: 'ajout', component: PrescriptionComponent   , canActivate : [AuthGuardService]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
