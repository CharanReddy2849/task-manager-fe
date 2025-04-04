import { Component, signal } from '@angular/core';
import { CreateTaskComponent } from "../create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent,CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tasks = signal<any[]>([]);
  taskList = [
    {
      _id: '1',
      title: 'Finish Angular Project',
      description: 'Complete the Angular task manager frontend UI',
      category: 'Work',
      status: 'pending'
    },
    {
      _id: '2',
      title: 'Grocery Shopping',
      description: 'Buy vegetables, milk, and fruits',
      category: 'Personal',
      status: 'completed'
    },
    {
      _id: '3',
      title: 'Book Flight Tickets',
      description: 'Book tickets to Delhi for next month',
      category: 'Travel',
      status: 'pending'
    }
  ];
  showForm = signal(false);
  selectedTask: any = null;
  search = '';
  filterCategory = '';
  filterStatus = '';

  ngOnInit() {
    this.loadTasks();
  }

  newTask() {
    this.selectedTask = null;
    this.showForm.set(true);
  }

  loadTasks() {
    const query: any = {};
    if (this.search) query.search = this.search;
    if (this.filterCategory) query.category = this.filterCategory;
    if (this.filterStatus) query.status = this.filterStatus;
    // this.taskService.getTasks(query).subscribe((res: any) => {
    //   this.tasks.set(res);
    // });
  }

  editTask(task: any) {
    this.selectedTask = task;
  }

  clearTask() {
    this.selectedTask = null;
  }

  deleteTask(id: string) {
    // this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

}
