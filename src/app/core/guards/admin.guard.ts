
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn()) {
      // El usuario está autenticado, ahora verificamos si intenta acceder a "/login"
      if (state.url === '/login') {
        // Si el usuario está en sesión, pero intenta acceder a "/login", redirigirlo a la página de inicio
        this.router.navigate(['/admin']);
        return false; // Evita que se cargue la página de inicio de sesión
      } else {
        // El usuario está autenticado y no intenta acceder a "/login", permite el acceso a la página actual
        return true;
      }
    } else {
      // El usuario no está autenticado, redirige al "user-dashboard"
      this.router.navigate(['user-dashboard']);
      return false; // Evita que se cargue la página de inicio de sesión
    }
  }

}
