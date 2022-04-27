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



const routes: Routes = [
  { path: 'home', component: HomeComponent  , canActivate : [AuthGuardService,UserGuard]},
  { path: 'listeprofil', component: ListeprofilComponent , canActivate : [AuthGuardService]  },
  { path: 'parametre', component: ParametreComponent , canActivate : [AuthGuardService]  },
  { path: 'editCompte', component: EditcompteComponent , canActivate : [AuthGuardService] },
  { path: 'editImpression', component: EditInfoImpressionComponent , canActivate : [AuthGuardService] },
  { path: 'gestion', component: GestionComplementComponent , canActivate : [AuthGuardService] },
  { path: 'produits', component: ProduitsComponent , canActivate : [AuthGuardService] },
  { path: 'preparations', component: PreparationComponent , canActivate : [AuthGuardService] },
  { path: 'complements', component: ComplementsComponent , canActivate : [AuthGuardService] },
  { path: 'info/:id', component: InfoPersonneComponent , canActivate : [AuthGuardService] },
  { path: '', component: LoginComponent   },
  { path: 'register', component:RegisterComponent  },
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

 { path: 'admin/groupes/listegroupes', component: ListeGroupesComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/groupes/editgroupe', component: EditGroupeComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/groupes/consultgroupe', component: DetailGroupeComponent , canActivate : [AuthGuardService,ChildGuard]  },
 { path: 'admin/ajout', component: PrescriptionComponent   , canActivate : [AuthGuardService,ChildGuard]  },
  
  { path: 'admin/gestion', component: GestionComplementComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/produits', component: ProduitsComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/preparations', component: PreparationComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/complements', component: ComplementsComponent , canActivate : [AuthGuardService,ChildGuard] },
  { path: 'admin/ajoutpreparation', component: AjouterPreparationComponent , canActivate : [AuthGuardService,ChildGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [ListeprofilComponent, 
  HomeComponent, ]