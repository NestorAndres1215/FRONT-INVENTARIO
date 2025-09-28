import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntradaService } from 'src/app/core/services/entrada.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.css']
})
export class RegistrarEntradaComponent implements OnInit {
  fechaEntrada: string = "";
  listaDetalleEntrada: any[] = [];
  producto: any[] = [];
  isLoggedIn = false;
  user: any = null;

  detalleEntrada: any = {

    descripcion: '',
    cantidad: '',

    producto: {
      productoId: '',
    },
    usuario: {
      id: '',
    },
    entrada: {
      fechaEntrada: '',
    },
  };

  constructor(
    private productoService: ProductoService,
    private login: LoginService,
    private entradaService: EntradaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerProducto();
    this.obtenerUsuario();

  }
  enviarEntrada() {
    console.log(this.detalleEntrada);





    //Verifica que los campos estén completos
    if (this.listaDetalleEntrada.length > 0) {
      // Asegúrate de que this.fechaEntrada tenga un valor definido antes de usarlo




      // Itera sobre cada elemento del arreglo
      this.listaDetalleEntrada.forEach((detalleEntrada: any) => {
        detalleEntrada.usuario.id = this.user.id;
      });

      // Llama a tu función para enviar la entrada al servidor
      this.entradaService.crearEntradaConDetalles(this.listaDetalleEntrada)
        .subscribe((response) => {
          console.log('Respuesta del servidor:', response);
          this.listaDetalleEntrada = [];
          this.limpiar();

          swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La entrada se ha enviado correctamente',
          });
          this.router.navigate(['/admin/entradas']);

          // Puedes manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito al usuario)
        }, (error) => {
          console.error('Error al hacer la solicitud:', error);
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar la entrada. Por favor, inténtalo de nuevo.',
          });
        });
    } else {
      // Maneja el caso en el que los campos no estén completos
      console.error('Campos incompletos');
      // Puedes mostrar un mensaje de error al usuario o realizar otras acciones aquí
      swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de enviar la entrada.',
      });

    }
  }



  obtenerProducto() {
    this.productoService.listarProductoActivadas().subscribe(
      (producto: any) => {
        this.producto = producto;
      },
      (error: any) => {
        console.log("Error al obtener las categorías: ", error);
      }
    );
  }
  obtenerUsuario() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }

  agregarProducto() {
    this.listaDetalleEntrada.push({ ...this.detalleEntrada });
    this.limpiar();
  }
  limpiar() {
    this.detalleEntrada = {
      descripcion: '',
      cantidad: null,

      producto: {
        productoId: '',
      },
      usuario: {
        id: '',
      },
      entrada: {
        fechaEntrada: '',
      },
    }

  }
 
  guardarValor(event: any) {
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
  
  
  
  
}
