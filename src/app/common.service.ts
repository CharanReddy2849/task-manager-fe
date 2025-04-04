import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getTasks(queryParams: any = {}) {
    return this.http.get('', { params: queryParams });
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
