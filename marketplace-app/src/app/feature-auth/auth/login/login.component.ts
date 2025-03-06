import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  login(){
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      if(this.authService.login(email, password)) {
        this.toastr.success('Accesso effettuato con successo!', 'Benvenuto!');
        this.router.navigate(['/products']);
      } else {
        this.toastr.error('Email o password errati', 'Errore di accesso');
      }
    }
  }
}
