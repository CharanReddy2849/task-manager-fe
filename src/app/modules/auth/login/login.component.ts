import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  toastr = inject(ToastrService);
  cs = inject(CommonService);
  loading: boolean = false;

  LoginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
    ],
  });

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.loading = true;
    const payload = this.LoginForm.value;
    this.cs.signIn(payload).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.toastr.success('Login successfull');
          localStorage.setItem('token', res.token);
          this.router.navigate(['dashboard']);
        } else {
          this.loading = false;
          this.toastr.error(
            'Please check your email and password',
            'Unable to login'
          );
        }
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Please check your email and password',
          'Unable to login'
        );
      },
    });
  }
}
