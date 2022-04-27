import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../client/Services/RestUser.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivate {
  role!: string
  constructor(private router: Router,private  authService : AuthService) { }      

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.role = JSON.parse(localStorage.getItem('currentUser')!).role
      if (this.role == 'ROLE_ADMIN') {
return true      }
alert ('vous n\'avez pas l\'acces vers cet page')
this.router.navigate((['/home']))
return false  }
  
}
