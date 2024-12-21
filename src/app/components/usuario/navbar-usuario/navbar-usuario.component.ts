import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent implements OnInit {
  isLoggedIn = false;
  user:any = null;
  contenido: any;
  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
    ///


  }

  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  public logout() {
    this.login.logout();
    window.location.href = '';
  }
  hayContenidoEnPagina(): boolean {
    // Verificar si la variable "contenido" tiene algún valor
    return !!this.contenido;
  }
}
