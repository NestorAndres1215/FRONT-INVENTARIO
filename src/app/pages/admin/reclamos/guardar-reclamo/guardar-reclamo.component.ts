import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { ReclamoService } from 'src/app/core/services/reclamo.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-guardar-reclamo',
  templateUrl: './guardar-reclamo.component.html',
  styleUrls: ['./guardar-reclamo.component.css']
})
export class GuardarReclamoComponent implements OnInit {
  isLoggedIn = false;
  user:any = null;
  reclamo:any={
    asunto:'',
    usuario: {
      id: '',
    },
  }
 
  constructor(
    private login:LoginService,
    private router: Router,
    private reclamoService:ReclamoService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }


  enviarEntrada() {
    console.log(this.reclamo.asunto);
    
    // Verifica que los campos estén completos
    if (this.reclamo.asunto && this.user) {
      // Crea un objeto para representar la entrada
      const entrada = {
        asunto: this.reclamo.asunto,
        usuario: this.user
      };
      
      // Llama a tu función para enviar la entrada al servidor
      this.reclamoService.agregarReclamo(entrada)
        .subscribe((response) => {
          console.log('Respuesta del servidor:', response);
  
          swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La entrada se ha enviado correctamente',
          });
          this.router.navigate(['/user-dashboard/configuracion']);
          this.limpiar();
  
          // Puedes manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito al usuario)
        }, (error) => {
          console.error('Error al hacer la solicitud:', error);
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar la entrada. Por favor, inténtalo de nuevo.',
          });
        });
    } else {
      // Maneja el caso en el que los campos no estén completos
      console.error('Campos incompletos');
      // Puedes mostrar un mensaje de error al usuario o realizar otras acciones aquí
      swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de enviar la entrada.',
      });
    }
  }
  
  limpiar() {
    this.reclamo = {
      asunto: '',
    }

  }


  obtenerUsuario(){
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
