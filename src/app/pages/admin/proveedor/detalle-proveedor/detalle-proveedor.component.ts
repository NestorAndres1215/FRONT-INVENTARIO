import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/core/services/proveedor.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  proveedor: any;
  proveedorId: any = 0;
  constructor(
    private proveedorService:ProveedorService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['proveedorId'];
    console.log("llego id"+this.proveedorId);
    console.log(this.route.snapshot.params);
    this.obtenerProveedorPorId(this.proveedorId);
    
  }

  obtenerProveedorPorId(proveedorId: number): void {
    this.proveedorService.obtenerProveedorPorId(proveedorId).subscribe(
      (data) => {
        this.proveedor = data;
        console.log(this.proveedor);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
