import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from '../models/helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  descargarSalida(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-salidas`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }

  descargarEntrada(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-entradas`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }
  descargarProveedor(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-proveedor`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }
  descargarProducto(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-productos`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }
  descargarUsuarioAdmin(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-administrador`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }
  descargarUsuarioOperador(): Observable<Blob> {
    const url = `${baserUrl}/pdf/generar-operador`; // Reemplaza con la ruta correcta a tu endpoint de PDF

    return this.http.get(url, { responseType: 'blob' });
  }
}
