import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  form = this.fb.group({
    email: '',
    password: ''
  });

  login() {
    // this.http.post<any>('http://localhost:3000/api/auth/login', this.form.value).subscribe(res => {
    //   localStorage.setItem('token', res.token);
    //   this.router.navigate(['/']);
    // });
  }

}
