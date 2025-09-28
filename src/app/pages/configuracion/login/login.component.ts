import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    login: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hidePassword = true; // control del ojo
  formSubmit() {
    console.log('hola');
    if (
      this.loginData.login.trim() == '' ||
      this.loginData.login.trim() == null
    ) {
      console.log(this.loginData);

      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if (this.loginService.getUserRole() == 'ADMIN') {
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() == 'NORMAL') {
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          } else {
            this.loginService.logout();
          }
        });
      },
      (error) => {
        console.log(error);
        this.snack.open(
          'Detalles inválidos , vuelva a intentar !!',
          'Aceptar',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}
