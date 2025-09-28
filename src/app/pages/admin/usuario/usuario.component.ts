import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    
  }
  activeTab: number = 0;
}
