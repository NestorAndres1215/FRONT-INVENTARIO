import { Component, OnInit } from '@angular/core';
import { ReclamoService } from 'src/app/core/services/reclamo.service';

@Component({
  selector: 'app-listar-reclamo-desactivados',
  templateUrl: './listar-reclamo-desactivados.component.html',
  styleUrls: ['./listar-reclamo-desactivados.component.css']
})
export class ListarReclamoDesactivadosComponent implements OnInit {

  reclamo: any = [];
  reclamos: any;
  constructor(
    private reclamoService: ReclamoService

  ) { }

  ngOnInit(): void {
    this.obtenerReclamoDesactivados();
  }
  obtenerReclamoDesactivados() {
    this.reclamoService.listarReclamoDesactivadas().subscribe(
      (reclamos: any) => {
        this.reclamos = reclamos;
      },
      (error: any) => {
        console.log("Error al obtener las marcas: ", error);
      }
    );
  }

}
