import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamoService } from 'src/app/core/services/reclamo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-responder-correo',
  templateUrl: './responder-correo.component.html',
  styleUrls: ['./responder-correo.component.css']
})
export class ResponderCorreoComponent implements OnInit {

  reclamoId!: number;
  reclamo: any = {}; 
  mensaje: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamoService: ReclamoService
  ) { }

  ngOnInit(): void {
    this.reclamoId = this.route.snapshot.params['reclamoId'];
    console.log("llego id"+this.reclamoId);
    console.log(this.route.snapshot.params);
    this.obtenerReclamoPorId(this.reclamoId);
    
  }

  obtenerReclamoPorId(reclamoId: number): void {
    this.reclamoService.obtenerReclamoPorId(reclamoId).subscribe(
      (data) => {
        this.reclamo = data;
        console.log(this.reclamo);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  enviarDisculpas(): void {
    this.reclamoService.enviarDisculpas(this.reclamoId, this.mensaje).subscribe(
      (response) => {
        // Manejar la respuesta exitosa
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Las disculpas se han enviado correctamente',
        });
        this.router.navigate(['/user-dashboard/configuracion']);
      },
      (error) => {
        // Manejar el error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar las disculpas. Por favor, inténtalo de nuevo.',
        });
      }
    );
  }
}
