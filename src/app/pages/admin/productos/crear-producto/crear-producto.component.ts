import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/core/services/producto.service';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/core/services/proveedor.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {


  proveedores: any[] = [];
  producto: any = {
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    proveedor: {
      proveedorId: '',
    }

  };


  constructor(
    private snack: MatSnackBar,
    private productoService: ProductoService,
    private router: Router,
    private proveedorService:ProveedorService

  ) { }

  ngOnInit(): void {

    this.obtenerProveedor();
  }

  formSubmit() {


    if (!this.producto.nombre || !this.producto.precio || !this.producto.descripcion|| !this.producto.ubicacion|| !this.producto.stock|| !this.producto.proveedor ) {
      // Mostrar un mensaje de error si falta alguno de los atributos
      Swal.fire({
          icon: 'error',
          title: 'Faltan datos',
          text: 'Por favor, ingrese todos los atributos antes de guardar el producto inventario.'
      });
      return; // Detener la ejecución si falta algún atributo
  }

    console.log("let's go");
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('stock',this.producto.stock)
    formData.append('ubicacion',this.producto.ubicacion)
    formData.append('proveedorId', this.producto.proveedor.proveedorId);
    this.productoService.agregarProducto(
      this.producto.nombre,
      this.producto.precio,
      this.producto.descripcion,
      this.producto.stock,
      this.producto.ubicacion,
      this.producto.proveedor.proveedorId,


    ).subscribe(
      (dato: any) => {
        // Reiniciar los valores del producto 
        console.log("hopla"),
          this.producto = {
            nombre: '',
            precio: '',
            descripcion: '',
            stock: '',
            ubicacion: '',
            
            proveedor: {
              proveedorId: '',
            }
          };

        Swal.fire(
          'Solicitud de Compra enviada',
          'Se ha enviado su Solicitud de Compra con éxito',
          'success'
        );
        this.router.navigate(['/admin/producto']);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'Error !!',
          'Error al enviar su solicitud de compra',
          'error'
        );
      }
    );
  }




  resetForm() {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
  
      proveedor: {
        proveedorId: '',
      },
    };
  }
  validarNumeroPositivo(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    // Eliminar caracteres no numéricos, excepto el signo '-' si es el primer carácter
    inputValue = inputValue.replace(/[^0-9-]/g, '');
    // Si el valor comienza con "-", permitirlo, de lo contrario, eliminarlo
    if (inputValue.charAt(0) === '-' && inputValue.length > 1) {
        inputValue = '-' + inputValue.replace('-', '');
    } else {
        inputValue = inputValue.replace('-', '');
    }
    // Actualizar el valor del campo de entrada con los caracteres filtrados
    inputElement.value = inputValue;
}



  obtenerProveedor() {
    this.proveedorService.listarProveedorActivadas().subscribe(
      (proveedor: any) => {
        this.proveedores = proveedor;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }
  

 
}
