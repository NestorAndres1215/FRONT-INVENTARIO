import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { SalidaService } from 'src/app/services/salida.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-salida',
  templateUrl: './actualizar-salida.component.html',
  styleUrls: ['./actualizar-salida.component.css']
})
export class ActualizarSalidaComponent implements OnInit {

  detalleSalidaId: any = 0;
  detalleSalida: any;
  productos: any[] = [];
  productoId: any = 0;

  constructor(
    private entradaService: SalidaService,
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.detalleSalidaId = this.route.snapshot.params['detalleSalidaId'];
    this.entradaService.obtenerSalidaPorId(this.detalleSalidaId).subscribe(
      (data) => {
        this.detalleSalida = data;
        console.log(this.detalleSalida);
      },
      (error) => {
        console.log(error);
      }
    )
    this.productoService.listarProductoActivadas().subscribe(
      (data: any) => {
        this.productos = data; // Asigna los datos al arreglo proveedores
        console.log(this.productos); // Verifica si los datos se han asignado correctamente
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarDetalleEntrada() {
    const datosActualizados = {
      fecha: this.detalleSalida.fecha,
      cantidad: this.detalleSalida.cantidad,
      descripcion: this.detalleSalida.descripcion,
      nombre: this.detalleSalida.producto.nombre
    };
  
    this.entradaService
      .actualizarDetalleSalida(this.detalleSalidaId, datosActualizados)
      .subscribe(
        response => {
          // Mostrar un mensaje de éxito con SweetAlert
          swal.fire({
            title: 'Actualización exitosa',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/admin/entradas']);
          });
        },
        error => {
          // Mostrar un mensaje de error con SweetAlert
          swal.fire({
            title: 'Error al actualizar',
            text: 'Hubo un problema al actualizar los datos.',
            icon: 'error'
          });
          console.error('Error al actualizar', error);
        }
      );
  }
}
