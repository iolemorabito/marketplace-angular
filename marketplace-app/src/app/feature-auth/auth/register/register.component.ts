import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿ\s]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿ\s]+$')]],
      birthdate: ['', [
        Validators.required,
        Validators.pattern('^(19[0-9]{2}|20[0][0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')
      ]],      
      email: ['', [Validators.required, Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }

  ngOnInit(): void {}

  register() {
    if(this.registerForm.valid){
      const {name, surname, birthdate,email, password} = this.registerForm.value;
      const success = this.authService.register({name, surname, birthdate, email, password});

      if(success){
      this.toastr.success('Registrazione compleata! Ora puoi accedere.');
      this.router.navigate(['/login']);
      }
    }
  }

  
}
