import { Component, OnInit } from '@angular/core';
import { ReclamoService } from 'src/app/core/services/reclamo.service';

@Component({
  selector: 'app-listar-reclamo-activados',
  templateUrl: './listar-reclamo-activados.component.html',
  styleUrls: ['./listar-reclamo-activados.component.css']
})
export class ListarReclamoActivadosComponent implements OnInit {

  reclamo: any = [];
  reclamos: any;
  constructor(
    private reclamoService:ReclamoService

  ) { }

  ngOnInit(): void {
    this.obtenerReclamoActivado();
  }
  obtenerReclamoActivado() {
    this.reclamoService.listarReclamoActivadas().subscribe(
      (reclamos: any) => {
        this.reclamos = reclamos;
      },
      (error: any) => {
        console.log("Error al obtener las marcas: ", error);
      }
    );
  }
}
