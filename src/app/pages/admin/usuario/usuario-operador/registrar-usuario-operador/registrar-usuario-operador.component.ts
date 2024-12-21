import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar-usuario-operador',
  templateUrl: './registrar-usuario-operador.component.html',
  styleUrls: ['./registrar-usuario-operador.component.css']
})
export class RegistrarUsuarioOperadorComponent implements OnInit {

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

  constructor(private router: Router,private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
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


    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        this.router.navigate(['/admin/usuario']);
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
  }
  limitarLongitud1(event: any) {
    const input = event.target;
    const maxLength = 8; // Máxima longitud permitida

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Limita la longitud
    }
  }
  limitarLongitudTelefono(event: any) {
    const input = event.target;
    const maxLength = 9; // Máxima longitud permitida

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Limita la longitud
    }
  }
}
