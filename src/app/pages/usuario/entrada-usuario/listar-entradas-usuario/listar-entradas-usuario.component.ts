import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntradaService } from 'src/app/core/services/entrada.service';
import { ReportesService } from 'src/app/core/services/reportes.service';

@Component({
  selector: 'app-listar-entradas-usuario',
  templateUrl: './listar-entradas-usuario.component.html',
  styleUrls: ['./listar-entradas-usuario.component.css']
})
export class ListarEntradasUsuarioComponent implements OnInit {

  detalleEntrada: any[] = [];


  constructor(private http: HttpClient,
    private entradaService: EntradaService,
    private router: Router,
    private reporteSalida:ReportesService
   
  ) { }
  ngOnInit(): void {
    this.obtenerEntradas();
  }

  obtenerEntradas() {
    console.log("llego pppipippi")
    this.entradaService.listarEntradas().subscribe(
      (detalleEntrada: any) => {
        this.detalleEntrada = detalleEntrada;
      },
      (error: any) => {
        console.log("Error al obtener las marcas: ", error);
      }
    );
  }
  descargarPDF() {
    this.reporteSalida.descargarEntrada().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_entradas_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }

}
