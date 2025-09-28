import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: any;
  productoId: any = 0;
  proveedores: any[] = [];
  proveedorId: any = 0;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoId = this.route.snapshot.params['productoId'];

    // Obtén el producto y los proveedores
    this.productoService.obtenerProductoPorId(this.productoId).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.proveedorService.listarProveedorActivadas().subscribe(
      (data: any) => {
        this.proveedores = data; // Asigna los datos al arreglo proveedores
        console.log(this.proveedores); // Verifica si los datos se han asignado correctamente
      },
      (error) => {
        console.log(error);
      }
    );
  }





  actualizarProducto(): void {
    // Verificar si el proveedorId y proveedor son válidos
    if (!this.producto.nombre || !this.producto.precio || !this.producto.descripcion|| !this.producto.ubicacion|| !this.producto.stock|| !this.producto.proveedor ) {
      // Mostrar un mensaje de error si falta alguno de los atributos
      Swal.fire({
          icon: 'error',
          title: 'Faltan datos',
          text: 'Por favor, ingrese todos los atributos antes de guardar el producto inventario.'
      });
      return; // Detener la ejecución si falta algún atributo
  }


    console.log('ProveedorId:', this.productoId);
    console.log('Proveedor:', this.producto);

    // Llamar al servicio para actualizar el proveedor
    this.productoService.actualizarProducto(this.productoId, this.producto).subscribe(
      (respuesta: any) => {
        // El proveedor se actualizó correctamente
        console.log('Proveedor actualizado:', respuesta);
        Swal.fire({
          icon: 'success',
          title: 'Proveedor actualizado',
          text: 'El proveedor se ha actualizado correctamente.'
        }).then(() => {
          // Redireccionar a la página de proveedores
          this.router.navigate(['/admin/producto']);
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


}

