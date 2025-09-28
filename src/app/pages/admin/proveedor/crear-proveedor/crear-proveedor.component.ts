import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  constructor(private proveedorService: ProveedorService, private router: Router) { }
  nombre: string = '';
  Ruc: string = '';
  Direccion: string = '';
  Telefono: string = '';
  Email: string = '';
  ngOnInit(): void {
  }
  crearProveedor(): void {
    // Validar que todos los atributos sean ingresados
    if (!this.nombre || !this.Ruc || !this.Direccion || !this.Email) {
        // Mostrar un mensaje de error si falta alguno de los atributos
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, ingrese todos los atributos antes de guardar el proveedor.'
        });
        return; // Detener la ejecución si falta algún atributo
    }

    // Validar la longitud del número de teléfono
    if (this.Telefono && this.Telefono.toString().length !== 9) {
        // Mostrar un mensaje de error si la longitud no es 9 dígitos
        Swal.fire({
            icon: 'error',
            title: 'Número de teléfono incorrecto',
            text: 'El número de teléfono debe tener exactamente 9 dígitos.'
        });
        return; // Detener la ejecución si la longitud es incorrecta
    }
    if (this.Ruc && this.Ruc.toString().length !== 11) {
      // Mostrar un mensaje de error si la longitud no es 9 dígitos
      Swal.fire({
          icon: 'error',
          title: 'Número de teléfono incorrecto',
          text: 'El número de teléfono debe tener exactamente 11 dígitos.'
      });
      return; // Detener la ejecución si la longitud es incorrecta
  }

    // Si todos los atributos están presentes y el teléfono tiene 9 dígitos, procede a guardar el proveedor
    this.proveedorService.agregarProveedor(this.nombre, this.Ruc, this.Direccion, this.Telefono, this.Email).subscribe(
        (respuesta: any) => {
            // El proveedor se creó correctamente
            console.log('Proveedor creado:', respuesta);

            Swal.fire({
                icon: 'success',
                title: 'Proveedor creado',
                text: 'El proveedor se ha creado correctamente.'
            });
            this.router.navigate(['/admin/proveedor']);
        },
        (error: any) => {
            // Error al crear el proveedor
            console.error('Error al crear el proveedor:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error al crear el proveedor',
                text: 'Ocurrió un error al crear el proveedor. Por favor, inténtalo de nuevo.'
            });
        }
    );
}

  validarNumeroPositivo(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    // Eliminar caracteres no numéricos, excepto el signo '-' si es el primer carácter
    inputValue = inputValue.replace(/[^0-9-]/g, '');
    // Si el valor comienza con "-", permitirlo, de lo contrario, eliminarlo
    if (inputValue.charAt(0) === '-' && inputValue.length > 1) {
        inputValue = '-' + inputValue.replace('-', '');
    } else {
        inputValue = inputValue.replace('-', '');
    }
    // Actualizar el valor del campo de entrada con los caracteres filtrados
    inputElement.value = inputValue;
}


limitarLongitud1(event: any) {
  const input = event.target;
  const maxLength = 8; // Máxima longitud permitida

  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength); // Limita la longitud
  }
}
limitarLongitud2(event: any) {
  const input = event.target;
  const maxLength = 10; // Máxima longitud permitida

  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength); // Limita la longitud
  }
}
}
