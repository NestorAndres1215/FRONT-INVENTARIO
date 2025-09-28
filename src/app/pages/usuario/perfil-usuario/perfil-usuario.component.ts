import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user:any = null;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }


}
