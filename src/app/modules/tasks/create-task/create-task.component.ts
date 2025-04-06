import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  cs = inject(CommonService);

  @Input() task: any;
  @Input() refresh: () => void = () => {};
  @Output() close = new EventEmitter<boolean>();

  loading:boolean = false;

  taskForm = this.fb.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
    category: ['',Validators.required],
    status: 'pending',
    tags:'important'
  });

  ngOnInit() {
    if (this.task) {
      console.log(this.task)
      this.taskForm.patchValue(this.task);
    }
  }

  saveTask() {
    this.loading = true;
    let payload;
    if(this.task && this.task?._id){
      payload = {
        id:this.task._id,
        taskData:this.taskForm.value
      }
    }

    const operation = this.task && this.task._id
      ? this.cs.updateTask(payload)
      : this.cs.createTask(this.taskForm.value);

    operation.subscribe({
      next: () => {
        this.toastr.success('Task saved successfully!');
        this.refresh();
        this.loading = false
        this.close.emit(true);
      },
      error: () => {
        this.loading = false
        this.toastr.error('Failed to save task')
      }
    });
  }

}
