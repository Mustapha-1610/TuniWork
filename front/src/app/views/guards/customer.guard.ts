import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class customerGuard implements CanActivate  {
 
 
 
  constructor(private router:Router) {}

 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  if (localStorage.getItem('customerInfos')) {
    return true;
  } else {
    this.router.navigate(['/']);
    return false;
  }
}

  
}
