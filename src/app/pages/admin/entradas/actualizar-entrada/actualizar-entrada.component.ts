import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EntradaService } from 'src/app/services/entrada.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-entrada',
  templateUrl: './actualizar-entrada.component.html',
  styleUrls: ['./actualizar-entrada.component.css']
})
export class ActualizarEntradaComponent implements OnInit {
  detalleEntradaId: any = 0;
  detalleEntrada: any;
  productos: any[] = [];
  productoId: any = 0;

  constructor(
    private entradaService: EntradaService,
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.detalleEntradaId = this.route.snapshot.params['detalleEntradaId'];
    this.entradaService.obtenerEntradaPorId(this.detalleEntradaId).subscribe(
      (data) => {
        this.detalleEntrada = data;
        console.log(this.detalleEntrada);
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
      fecha: this.detalleEntrada.fecha,
      cantidad: this.detalleEntrada.cantidad,
      descripcion: this.detalleEntrada.descripcion,
      nombre:this.detalleEntrada.producto.nombre
    };
console.log(datosActualizados)
    this.entradaService
      .actualizarDetalleEntrada(this.detalleEntradaId, datosActualizados)
      .subscribe(
        response => {
          this.router.navigate(['/admin/entradas']);
          // Manejar la respuesta exitosa aquí, por ejemplo, mostrar un mensaje de éxito
          console.log('Actualización exitosa', response);
        },
        error => {
          // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
          console.error('Error al actualizar', error);
        }
      );

  }


}
