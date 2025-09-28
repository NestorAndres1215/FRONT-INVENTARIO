import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-desactivar-proveedor',
  templateUrl: './listar-desactivar-proveedor.component.html',
  styleUrls: ['./listar-desactivar-proveedor.component.css']
})
export class ListarDesactivarProveedorComponent implements OnInit {
  nombre: string = '';
  ruc: string = '';
  proveedor: any = [];
  proveedorId: string = '';
  proveedores: any;
  constructor(private proveedorService: ProveedorService,
    private router:Router) { }

  ngOnInit(): void {
    this.obtenerMarcasDesactivadas();
  }
  obtenerMarcasDesactivadas() {
    this.proveedorService.listarProveedorDesactivadas().subscribe(
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
    this.ruc = '';
    this.proveedorService.listarProveedorActivadas().subscribe(
      (proveedores: any) => {
        this.proveedores = proveedores;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }

  activarProveedor(proveedorId: any) {
    this.proveedorService.activarProveedor(proveedorId).subscribe(
      () => {
        console.log('Proveedor activada exitosamente');
        Swal.fire('Éxito!', 'Proveedor activada exitosamente', 'success');
        this.obtenerMarcasDesactivadas();
        this.router.navigate(['/admin/proveedor']);
      },
      (error) => {
        console.log('Error al activar la Proveedor:', error);
        Swal.fire('Error!', 'Error al activar la Proveedor', 'error');
      }
    );
  }

}
