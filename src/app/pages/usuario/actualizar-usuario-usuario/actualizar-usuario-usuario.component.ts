import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-usuario-usuario',
  templateUrl: './actualizar-usuario-usuario.component.html',
  styleUrls: ['./actualizar-usuario-usuario.component.css']
})
export class ActualizarUsuarioUsuarioComponent implements OnInit {

  user: any = null;
  id: any = null; // Agrega una propiedad para almacenar el ID
  
  constructor(    private router: Router,private loginService: LoginService, private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.id = this.user.id; // Asigna el ID del usuario a la propiedad "id"
  }
  
  actualizarUsuario(): void {
    if (!this.id || !this.user) {
      console.error('ID de usuario o datos de usuario no válidos.');
      return;
    }
  
    this.usuarioService.actualizarUsuario(this.id, this.user).subscribe(
      (respuesta: any) => {
        // Mostrar notificación de éxito con swal
        swal.fire('¡Éxito!', 'Usuario actualizado correctamente', 'success');
        console.log('Usuario actualizado:', respuesta);
        this.router.navigate(['/user-dashboard/configuracion']);
      },
      (error: any) => {
        // Mostrar notificación de error con swal
        swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
