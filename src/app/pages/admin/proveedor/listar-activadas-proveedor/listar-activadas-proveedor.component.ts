import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { ReportesService } from 'src/app/core/services/reportes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-activadas-proveedor',
  templateUrl: './listar-activadas-proveedor.component.html',
  styleUrls: ['./listar-activadas-proveedor.component.css']
})
export class ListarActivadasProveedorComponent implements OnInit {
  nombre: string = '';
  ruc: string = '';
  proveedores: any[] = [];

  proveedorId: string = '';
productos: any;
  //proveedores: any;

  constructor(private proveedorService: ProveedorService,    private reporteSalida:ReportesService) { }

  ngOnInit(): void {
    this.obtenerProveedr();
  }

  obtenerProveedr() {
    this.proveedorService.listarProveedorActivadas().subscribe(
      (marcas: any) => {
        this.proveedores = marcas;
      },
      (error: any) => {
        console.log("Error al obtener las marcas: ", error);
      }
    );
  }
  buscarPorNombre() {
    try {
      if (this.nombre && this.proveedores) {
        this.proveedores = this.proveedores.filter((proveedor: any) =>
          proveedor.nombre.toLowerCase().includes(this.nombre.toLowerCase()) ||
          proveedor.ruc.toLowerCase().includes(this.nombre.toLowerCase())
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

    this.proveedorService.listarProveedorActivadas().subscribe(
      (proveedores: any) => {
        this.proveedores = proveedores;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }
  desactivarProveedor(proveedorId: any): void {
    this.proveedorService.desactivarProveedor(proveedorId).subscribe(
      (respuesta: any) => {
        // Desactivación exitosa
        Swal.fire({
          icon: 'success',
          title: 'Categoría desactivada',
          text: respuesta.mensaje
        });

        // Actualizar la lista de categorías activadas
        this.obtenerProveedr();
      },
      (error: any) => {
        // Error al desactivar la categoría
        Swal.fire({
          icon: 'error',
          title: 'Error al desactivar la categoría',
          text: error.error.mensaje
        });
      }
    );
  }
  pageSize = 5; // Tamaño de página (número de elementos por página)
  pageIndex = 0; // Índice de página actual

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  descargarPDF() {
    this.reporteSalida.descargarProveedor().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_proveedor.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }

}
