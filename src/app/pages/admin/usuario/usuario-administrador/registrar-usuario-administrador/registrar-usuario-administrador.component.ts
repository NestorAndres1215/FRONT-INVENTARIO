import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-usuario-administrador',
  templateUrl: './registrar-usuario-administrador.component.html',
  styleUrls: ['./registrar-usuario-administrador.component.css']
})
export class RegistrarUsuarioAdministradorComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UsuarioService, private snack: MatSnackBar) { }
  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni:'',
    direccion:''
  }

  ngOnInit(): void {
  }
  formSubmit() {
    console.log(this.user);
    if (!this.user.username || !this.user.password || !this.user.nombre || !this.user.apellido || !this.user.email || !this.user.direccion || this.user.dni === null || this.user.telefono === null) {
      // Mostrar un mensaje de error si falta alguno de los atributos
      Swal.fire({
          icon: 'error',
          title: 'Faltan datos',
          text: 'Por favor, ingrese todos los atributos antes de guardar el usuario.'
      });
      return; // Detener la ejecución si falta algún atributo
  }

    this.userService.añadirUsuarioAdmin(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema', 'success');
        this.router.navigate(['/admin/usuario']);
      }, (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
      }
    )
  }

  limitarLongitud(event: any) {
    const input = event.target;
    const maxLength = 8; // Máxima longitud permitida

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Limita la longitud
    }
  }
  limitarLongitud1(event: any) {
    const input = event.target;
    const maxLength = 8; // Máxima longitud permitida

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Limita la longitud
    }
  }
}
