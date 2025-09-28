import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalidaService } from 'src/app/core/services/salida.service';

@Component({
  selector: 'app-detalle-salidas',
  templateUrl: './detalle-salidas.component.html',
  styleUrls: ['./detalle-salidas.component.css']
})
export class DetalleSalidasComponent implements OnInit {

  detalleSalida: any;
  detalleSalidaId: any = 0;

  constructor(
    private salidaService:SalidaService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detalleSalidaId=this.route.snapshot.params['detalleSalidaId'];
    console.log("llego id"+this.detalleSalidaId);
    console.log(this.route.snapshot.params);
    this.obtenerSalidaId(this.detalleSalidaId)
  
  
  }
  obtenerSalidaId(detalleSalidaId:number):void{
    this.salidaService.obtenerSalidaPorId(detalleSalidaId).subscribe(
      (data)=>{
        this.detalleSalida=data;
        console.log(this.detalleSalida)
      },
      (error) => {
        console.log(error);
      }
    )

  }

}
