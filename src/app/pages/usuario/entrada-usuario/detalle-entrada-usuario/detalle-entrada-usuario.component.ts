import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaService } from 'src/app/core/services/entrada.service';

@Component({
  selector: 'app-detalle-entrada-usuario',
  templateUrl: './detalle-entrada-usuario.component.html',
  styleUrls: ['./detalle-entrada-usuario.component.css']
})
export class DetalleEntradaUsuarioComponent implements OnInit {

  detalleEntrada: any;
  detalleEntradaId: any = 0;
  constructor(
    private entradaService:EntradaService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detalleEntradaId=this.route.snapshot.params['detalleEntradaId'];
    console.log("llego id"+this.detalleEntradaId);
    console.log(this.route.snapshot.params);
    this.obtenerEntradaId(this.detalleEntradaId)
  
  
  }

  obtenerEntradaId(detalleEntradaId:number):void{
    this.entradaService.obtenerEntradaPorId(detalleEntradaId).subscribe(
      (data)=>{
        this.detalleEntrada=data;
        console.log(this.detalleEntrada)
      },
      (error) => {
        console.log(error);
      }
    )

  }
}
