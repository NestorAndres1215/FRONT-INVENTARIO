import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuario-administrador-desactivados',
  templateUrl: './lista-usuario-administrador-desactivados.component.html',
  styleUrls: ['./lista-usuario-administrador-desactivados.component.css']
})
export class ListaUsuarioAdministradorDesactivadosComponent implements OnInit {

  usuarioRoles: any[] = [];

  constructor(private usuarioRolService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarioRoles();
  }

  obtenerUsuarioRoles(): void {
    this.usuarioRolService.obtenerAdminUsuarioRolesDesactivados().subscribe(
      (usuarioRoles: any[]) => {
        this.usuarioRoles = usuarioRoles;
      },
      (error: any) => {
        console.error('Error al obtener los usuario-roles', error);
      }
    );
  }
  pageSize = 3; // Tamaño de página (número de elementos por página)
  pageIndex = 1; // 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  activarUsuario(usuarioRolId: any): void {
    this.usuarioRolService.activarUsuario(usuarioRolId).subscribe(
      (respuesta: any) => {
        // Desactivación exitosa
        Swal.fire({
          icon: 'success',
          title: 'Usuario desactivado',
          text: respuesta,
          confirmButtonText: 'Aceptar' // Opcional, puedes personalizar el botón de confirmación
        });

        this.obtenerUsuarioRoles();
      },
      (error: any) => {
        // Error al desactivar el usuario
        Swal.fire({
          icon: 'error',
          title: 'Error al desactivar usuario',
          text: error,
          confirmButtonText: 'Aceptar' // Opcional, puedes personalizar el botón de confirmación
        });

        // Resto del código de error
      }
    );
  }
}
