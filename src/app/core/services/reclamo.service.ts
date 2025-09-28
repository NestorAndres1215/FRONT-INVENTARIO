import { Injectable } from '@angular/core';
import baserUrl from '../models/helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http: HttpClient) { }

  //listar marcas activadas
  public listarReclamoActivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/reclamo/activadas`);
  }

  // listar marcas desactivadas
  public listarReclamoDesactivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/reclamo/desactivadas`);
  }

  public agregarReclamo(reclamo: any) {
    return this.http.post(`${baserUrl}/reclamo/`, reclamo);
  }

  //listar por id
  public obtenerReclamoPorId(reclamoId: any): Observable<any> {
    return this.http.get(`${baserUrl}/reclamo/${reclamoId}`);
  }

  public enviarDisculpas(reclamoId: any, mensaje: string): Observable<string> {
    const url = `${baserUrl}/reclamo/${reclamoId}/enviar-disculpas`;
    return this.http.post<string>(url, mensaje);
  }
}
