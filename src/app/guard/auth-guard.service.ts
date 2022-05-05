import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../client/Services/RestUser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private  RestUserService : RestUserService) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {   
    if (!this.RestUserService.getToken()) {  
      this.router.navigateByUrl("/");  
  }  
  else if (localStorage.getItem('jwt'))
{  return true}
return false
  //return this.RestUserService.getToken();  
    /*  if (this.isLoggedIn()) {      
     return true;      
     }      
     // navigate to login page as user is not authenticated      
  this.router.navigate(['/']);      
return false;      
}      
public isLoggedIn(): boolean {      
  let status = false;      
  if (sessionStorage.getItem('isLoggedIn') == "true") {      
     status = true;      
  }
    else {      
     status = false;      
     }      
  return status;      
  }     */
  }}