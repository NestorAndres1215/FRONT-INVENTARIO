import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from 'src/app/core/models/helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  constructor(
    private http: HttpClient
  ) { }
  public listarSalidas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/salidas/`);
  }

  public  crearEntradaConDetalles(listaDetalleSalida: any[]): Observable<any> {
    return this.http.post(`${baserUrl}/salidas/`, listaDetalleSalida);
  }
  actualizarDetalleSalida(detalleSalidaId: number, detalleEntrada: any): Observable<any> {
    const url = `${baserUrl}/salidas/${detalleSalidaId}`;
    return this.http.put(url, detalleEntrada);
  }


  public obtenerSalidaPorId(detalleSalidaId: any): Observable<any> {
    return this.http.get(`${baserUrl}/salidas/${detalleSalidaId}`);
  }


}
