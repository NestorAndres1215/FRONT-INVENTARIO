import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from 'src/app/core/models/helper';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  constructor(
    private http: HttpClient
  ) { }
  public listarEntradas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/entradas/`);
  }
  public  crearEntradaConDetalles(listaDetalleEntrada: any[]): Observable<any> {
    return this.http.post(`${baserUrl}/entradas/`, listaDetalleEntrada);
  }

 
  actualizarDetalleEntrada(detalleEntradaId: number, detalleEntrada: any): Observable<any> {
    const url = `${baserUrl}/entradas/${detalleEntradaId}`;
    return this.http.put(url, detalleEntrada);
  }
  public obtenerEntradaPorId(detalleEntradaId: any): Observable<any> {
    return this.http.get(`${baserUrl}/entradas/${detalleEntradaId}`);
  }



}
