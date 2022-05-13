import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../client/Services/RestUser.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  role!: string
  constructor(private router: Router,private  RestUserService : RestUserService) { }      

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.role = JSON.parse(localStorage.getItem('currentUser')!).role
      if (this.role == 'ROLE_USER' || this.role == '') {
return true      }
else 
alert ('vous n\'avez pas l\'acces vers cet page')
this.router.navigate((['/admin/home']))
return false  }
  
}

