import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.baseUrl;

  signIn(payload:any){
    return this.http.post('/api/auth/login',payload,{
      headers:{
        'X-META':'Login'
      }
    });
  };

  signUp(payload:any){
    return this.http.post('/api/auth/register',payload,{
      headers:{
        'X-META':'Login'
      }
    });
  };

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getTasks(queryParams: any = {}) {
    return this.http.get('/api/task/get-all-tasks', { params: queryParams });
  }

  createTask(payload: any) {
    return this.http.post('/api/task/createTask', payload);
  }

  updateTask(task: any) {
    return this.http.put('/api/task/updateTask', task);
  }

  markAsDone(queryParams:any){
    return this.http.patch('/api/task/markAsdone',{},{ params: queryParams });
  }

  deleteTask(id: string) {
    return this.http.delete('/api/task/deleteTask',{
      body:{id:id}
    });
  }
}
