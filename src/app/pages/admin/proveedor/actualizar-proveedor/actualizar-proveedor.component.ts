import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {

  proveedor: any;
  proveedorId: any = 0;
  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['proveedorId'];
    this.proveedorService.obtenerProveedorPorId(this.proveedorId).subscribe(
      (data) => {
        this.proveedor = data;
        console.log(this.proveedor);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  actualizarProveedor(): void {
    // Verificar si el proveedorId y proveedor son válidos
    // Validar que todos los atributos sean ingresados
    if (!this.proveedor.nombre || !this.proveedor.telefono || !this.proveedor.direccion || !this.proveedor.email || !this.proveedor.ruc) {
      // Alguno de los campos requeridos está vacío
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Todos los campos requeridos deben ser completados.'
      });
    } 
    if (this.proveedor.telefono && this.proveedor.telefono.toString().length !== 9) {
      // Mostrar un mensaje de error si la longitud no es 9 dígitos
      Swal.fire({
          icon: 'error',
          title: 'Número de teléfono incorrecto',
          text: 'El número de teléfono debe tener exactamente 9 dígitos.'
      });
      return; // Detener la ejecución si la longitud es incorrecta
  }
  if (this.proveedor.ruc && this.proveedor.ruc.toString().length !== 11) {
    // Mostrar un mensaje de error si la longitud no es 9 dígitos
    Swal.fire({
        icon: 'error',
        title: 'Número de teléfono incorrecto',
        text: 'El número de teléfono debe tener exactamente 11 dígitos.'
    });
    return; // Detener la ejecución si la longitud es incorrecta
}
    console.log('ProveedorId:', this.proveedorId);
    console.log('Proveedor:', this.proveedor);

    // Llamar al servicio para actualizar el proveedor
    this.proveedorService.actualizarProveedor(this.proveedorId, this.proveedor).subscribe(
      (respuesta: any) => {
        // El proveedor se actualizó correctamente
        console.log('Proveedor actualizado:', respuesta);
        Swal.fire({
          icon: 'success',
          title: 'Proveedor actualizado',
          text: 'El proveedor se ha actualizado correctamente.'
        }).then(() => {
          // Redireccionar a la página de proveedores
          this.router.navigate(['/admin/proveedor']);
        });
      },
      (error: any) => {
        // Error al actualizar el proveedor
        console.error('Error al actualizar el proveedor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el proveedor',
          text: 'Ocurrió un error al actualizar el proveedor. Por favor, inténtalo de nuevo.'
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
