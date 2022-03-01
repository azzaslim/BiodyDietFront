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
import { AjoutformComponent } from './Stepper/ajoutform/ajoutform.component';
import { InfoPersonneComponent } from './info-personne/info-personne.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate : [AuthGuardService]  },
  { path: 'listeprofil', component: ListeprofilComponent },
  { path: 'parametre', component: ParametreComponent },
  { path: 'recherche', component: RechercheformComponent },
  { path: 'editCompte', component: EditcompteComponent },
  { path: 'editImpression', component: EditInfoImpressionComponent },
  { path: 'gestion', component: GestionComplementComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'preparations', component: PreparationComponent},
  { path: 'complements', component: ComplementsComponent},
  { path: 'info', component: InfoComponent},
  { path: 'info/:id', component: InfoPersonneComponent},
  { path: 'info/:nom', component: InfoComponent},
  { path: '', component: LoginComponent },
  { path: 'ajout', component: AjoutformComponent  , canActivate : [AuthGuardService]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
