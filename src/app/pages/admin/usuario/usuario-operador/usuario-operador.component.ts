import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario-operador',
  templateUrl: './usuario-operador.component.html',
  styleUrls: ['./usuario-operador.component.css']
})
export class UsuarioOperadorComponent implements OnInit {
  ngOnInit(): void {
   
  }

  activeTab1: number = 0;
}
