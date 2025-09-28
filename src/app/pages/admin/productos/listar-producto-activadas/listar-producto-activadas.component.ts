import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ReportesService } from 'src/app/core/services/reportes.service';
@Component({
  selector: 'app-listar-producto-activadas',
  templateUrl: './listar-producto-activadas.component.html',
  styleUrls: ['./listar-producto-activadas.component.css']
})
export class ListarProductoActivadasComponent implements OnInit {
  nombre: string = '';
  producto: any = [];
  categoriaId: string = '';
  proveedorId: string = '';
  productos: any[] = [];
  productoId: string = '';
  constructor(private http: HttpClient,
    private productoService: ProductoService,
    private reporteSalida:ReportesService,
    private router: Router) { }
  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.productoService.listarProductoActivadas().subscribe(
      (productos: any) => {
        this.productos = productos;
      },
      (error: any) => {
        console.log("Error al obtener las productos: ", error);
      }
    );
  }
  pageSize = 6; // Tamaño de página (número de elementos por página)
  pageIndex = 0; // 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  desactivarProducto(productoId: any): void {
    this.productoService.desactivarProducto(productoId).subscribe(
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

    this.productoService.listarProductoActivadas().subscribe(
      (proveedores: any) => {
        this.productos = proveedores;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }

  descargarPDF() {
    this.reporteSalida.descargarProducto().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }
}
