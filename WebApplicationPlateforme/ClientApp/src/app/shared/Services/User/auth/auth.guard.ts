import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private servie: UserServiceService) {
  }

  getUserRoles(Id) {
    this.servie.getUserRoles(Id).subscribe(res => {
      
    })
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean >{
    if (localStorage.getItem('token') != null) {
      let roles = next.data['permittedRoles'] as Array<string>;
  
      if (roles) {
       
        if (await this.servie.roleMatch(roles)) {
   
          return true
        } else {        
          this.router.navigate(['forbidden-page'])
          return false
        }
      }
      return true;
    }
      
    else {
      this.router.navigate(['/user-register']);
      return false;
    }

  }
  
}
