import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-principal-usuario',
  templateUrl: './principal-usuario.component.html',
  styleUrls: ['./principal-usuario.component.css']
})
export class PrincipalUsuarioComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

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
  }

}
