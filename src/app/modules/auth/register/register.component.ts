import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  toastr = inject(ToastrService);
  cs = inject(CommonService);
  loading: boolean = false;

  RegisterForm = this.fb.group({
    username: ['', Validators.required],
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

  register() {
    this.loading = true;
    const payload = this.RegisterForm.value;
    this.cs.signUp(payload).subscribe({
      next: (res: any) => {
        console.log(res, 'cherry');
        if (res.user) {
          this.toastr.success('User registered successfull');
          this.router.navigate(['Login']);
        } else {
          this.loading = false;
          this.toastr.error(
            'Please check your email and password',
            'Unable to Register'
          );
        }
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Please check your email and password',
          'Unable to register'
        );
      },
    });
  }
}
