import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuario-administrador-activados',
  templateUrl: './lista-usuario-administrador-activados.component.html',
  styleUrls: ['./lista-usuario-administrador-activados.component.css']
})
export class ListaUsuarioAdministradorActivadosComponent implements OnInit {
  usuarioRoles: any = [];
  nombre: string = '';
  usuarioAutenticadoId: number = 1;
  constructor(private usuarioRolService: UsuarioService,   private reporteSalida:ReportesService) { }

  ngOnInit(): void {
    this.obtenerUsuarioRoles();
  }

  obtenerUsuarioRoles(): void {
    this.usuarioRolService.obtenerAdminUsuarioRoles().subscribe(
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
  desactivarUsuario(usuarioRolId: any): void {
    this.usuarioRolService.desactivarUsuario(usuarioRolId).subscribe(
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

  descargarPDF() {
    this.reporteSalida.descargarSalida().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_salidas_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }

}
