import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  usuarioRol: any;
  usuarioRolId: any = 0;
  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.usuarioRolId = this.route.snapshot.params['usuarioRolId'];
    console.log("llego id"+this.usuarioRolId);
    console.log(this.route.snapshot.params);
    this.obtenerUsuarioPorId(this.usuarioRolId);
    
  }

  obtenerUsuarioPorId(usuarioRolId: number): void {
    this.usuarioService.obtenerUsuarioPorId(usuarioRolId).subscribe(
      (data) => {
        this.usuarioRol = data;
        console.log(this.usuarioRol);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
