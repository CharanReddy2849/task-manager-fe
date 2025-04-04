import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  fb = inject(FormBuilder);
  // taskService = inject(TaskService);
  // toastr = inject(ToastrService);

  @Input() task: any;
  @Input() refresh: () => void = () => {};
  @Output() close = new EventEmitter<void>();

  loading = signal(false);

  form = this.fb.group({
    title: '',
    description: '',
    category: '',
    status: 'pending',
  });

  ngOnInit() {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }

  saveTask() {
    // this.loading.set(true);
    // const operation = this.task && this.task._id
    //   ? this.taskService.updateTask(this.task._id, this.form.value)
    //   : this.taskService.createTask(this.form.value);

    // operation.subscribe({
    //   next: () => {
    //     this.toastr.success('Task saved successfully!');
    //     this.refresh();
    //     this.close.emit();
    //   },
    //   error: () => this.toastr.error('Failed to save task'),
    //   complete: () => this.loading.set(false)
    // });
  }

}
