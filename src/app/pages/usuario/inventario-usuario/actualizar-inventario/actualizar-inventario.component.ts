import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-inventario',
  templateUrl: './actualizar-inventario.component.html',
  styleUrls: ['./actualizar-inventario.component.css']
})
export class ActualizarInventarioComponent implements OnInit {

  producto: any;
  productoId: any = 0;
  proveedores: any[]=[];
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
    if (!this.productoId || !this.producto) {
      console.error('ProveedorId o proveedor son inválidos.');
      return;
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
          this.router.navigate(['/user-dashboard/inventario']);
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
  

}
