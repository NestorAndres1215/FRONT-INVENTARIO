import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-producto-desactivadas',
  templateUrl: './listar-producto-desactivadas.component.html',
  styleUrls: ['./listar-producto-desactivadas.component.css']
})
export class ListarProductoDesactivadasComponent implements OnInit {

  nombre: string = '';
  producto: any = [];
  categoriaId: string = '';
  proveedorId: string = '';
  productos: any[] = [];

  constructor(private http: HttpClient,
    private productoService: ProductoService,
    private router: Router) { }
  ngOnInit(): void {
    this.obtenerProducto();
  }
  buscarPorNombre() {
    try {
      if (this.nombre && this.productos) {
        this.productos = this.productos.filter((proveedor: any) =>
          proveedor.nombre.toLowerCase().includes(this.nombre.toLowerCase()) 
        );
      } else {
        this.restaurarProveedores();
        console.log("Ingrese un nombre o RUC para buscar.");
      }
    } catch (error) {
      console.log("Error en la búsqueda: ", error);
      // Realizar acciones de manejo de errores, como mostrar un mensaje al usuario
    }
  }

  restaurarProveedores() {
    this.nombre = ''; // Restablecer el valor del nombre a vacío

    this.productoService.listarProductoDesactivadas().subscribe(
      (proveedores: any) => {
        this.productos = proveedores;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }

  obtenerProducto() {
    this.productoService.listarProductoDesactivadas().subscribe(
      (productos: any) => {
        this.productos = productos;
      },
      (error: any) => {
        console.log("Error al obtener las productos: ", error);
      }
    );
  }




  pageSize = 3; // Tamaño de página (número de elementos por página)
  pageIndex = 0; // 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  activarProducto(productoId: any): void {
    this.productoService.activarProducto(productoId).subscribe(
      (respuesta: any) => {
        // Desactivación exitosa
        Swal.fire({
          icon: 'success',
          title: 'Producto desactivado',
          text: respuesta.mensaje
        });

        // Actualizar la lista de categorías activadas
        this.obtenerProducto();
      },
      (error: any) => {
        // Error al desactivar la categoría
        Swal.fire({
          icon: 'error',
          title: 'Error al desactivar la producto',
          text: error.error.mensaje
        });
      }
    );
  }
}
