import { Component, inject, signal } from '@angular/core';
import { CreateTaskComponent } from "../create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../common.service';
import { debounceTime, skip, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent,CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  toastr = inject(ToastrService);
  taskList :any[] = [];
  // [
  //   {
  //     _id: '1',
  //     title: 'Finish Angular Project',
  //     description: 'Complete the Angular task manager frontend UI',
  //     category: 'Work',
  //     status: 'pending'
  //   },
  //   {
  //     _id: '2',
  //     title: 'Grocery Shopping',
  //     description: 'Buy vegetables, milk, and fruits',
  //     category: 'Personal',
  //     status: 'completed'
  //   },
  //   {
  //     _id: '3',
  //     title: 'Book Flight Tickets',
  //     description: 'Book tickets to Delhi for next month',
  //     category: 'Travel',
  //     status: 'pending'
  //   }
  // ];
  showForm : boolean = false;
  selectedTask: any = null;
  search = '';
  filterStatus = '';
  searchTask: Subject<Object> = new Subject<Object>();
  currentPage = signal(0);
  limit = 5;
  totalPages = signal(1);
  
  constructor( public readonly cs: CommonService){

  }

  ngOnInit() {
    this.loadTasks();
    this.searchTask.pipe(debounceTime(700)).subscribe((search: any) => {
      this.loadTasks();
    });
  }

  newTask() {
    this.selectedTask = null;
    this.showForm = true;
  }

  loadTasks() {
    const query: any = {};
    if (this.search) query.search = this.search;
    if (this.filterStatus) query.status = this.filterStatus;
    const params = {
      ...query,
      limit: this.limit,
      skip : this.currentPage()
    }
    this.cs.getTasks(params).subscribe({
      next:(res: any) => {
      if(res.task.data){
        this.taskList = res.task.data;
        this.totalPages.set(Math.ceil(res.task.count/this.limit));
      }else{
        this.taskList = [];
      }
      },error:(err) => {

      }
    });
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - this.limit);
      this.loadTasks();
    }
  }

  nextPage() {
    console.log(this.currentPage(),this.totalPages())
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + this.limit);
      this.loadTasks();
    }
  }

  editTask(task: any) {
    this.selectedTask = task;
    this.showForm = true;
  }

  clearTask(e:any) {
    this.selectedTask = null;
    this.showForm = false
    if(e){
      this.loadTasks();
    }
  }
  
  markTaskAsDone(taskId:any){
    const parms = {id:taskId};
    this.cs.markAsDone(parms).subscribe({
      next:(res: any) => {
        this.toastr.success('Task Marked Completed');
        this.loadTasks();
      },error:(err) => {

      }
    });
  }

  deleteTask(id: string) {
    this.cs.deleteTask(id).subscribe({
      next:() => {
        this.toastr.success('Task deleted successfully');
        this.loadTasks();
      },error:() => {
        this.toastr.error('Unable delete the Task')
      }
    });
  }
  

}
