import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any;
  productoId: any = 0;
  constructor(
    private productoService:ProductoService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.productoId = this.route.snapshot.params['productoId'];
    console.log("llego id"+this.productoId);
    console.log(this.route.snapshot.params);
    this.obtenerProductoPorId(this.productoId);
    
  }

  obtenerProductoPorId(productoId: number): void {
    this.productoService.obtenerProductoPorId(productoId).subscribe(
      (data) => {
        this.producto = data;
        console.log(this.producto);
      },
      (error) => {
        console.log(error);
      }
    );

}
}