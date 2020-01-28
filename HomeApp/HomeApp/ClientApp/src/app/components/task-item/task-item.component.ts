import { Component, OnInit } from '@angular/core';
import { TaskItemService } from '../../services/task-item.service';
import { AppError } from '../../common/app-error';
import { NotFoundError } from '../../common/not-found-error';
import { BadInput } from '../../common/bad-input';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  form = new FormGroup({
    'name': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'dueDate': new FormControl('', Validators.required)
  });

  get taskName() { return this.form.get('name'); }
    

  taskItems: TaskItem[];
  //taskItems: any;

  constructor(private service: TaskItemService) { //separation of concerns, use service -> not directly use http here...
    // no call of http services in constructor!
    ;
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.taskItems = response;
        //error handled by AppErrorHandler
      });
  }

  createTask() {
    let taskItem14: TaskItem = {
      taskId: 0,
      taskTitle: this.form.value.name,
      category: this.form.value.category,
      description: this.form.value.description,
      dueDate: this.form.value.dueDate,
      doneDate: new Date(),
      state: 0,
      seriesType: 0
    }; //assign value to local varibale
    this.form.reset();
    //optimistic update already here, will be withdrawn in case of error
    this.taskItems.splice(0, 0, taskItem14);

    //taskName.value = ''; //delete input after assessing value

    this.service.create(taskItem14)
      .subscribe(
        response => {
          taskItem14['Id'] = response;

          // pessimistic update here: this.taskItems.splice(0, 0, taskItem);
        },
        (error: AppError) => {
          // withdraw optimistic update in case of error
          this.taskItems.splice(0, 1);

          if (error instanceof BadInput) {
            //this.form.setErrors(error.originalError)
          }
          else throw error; //hit global error handler
          /*throw error replaces: {
            //alert function not best, since window will be frozen... -> save log to db
            alert('An unexpected error occurred.');
          }*/
        }
      );
  }

  updateTaskItem(taskItem: TaskItem) {
    this.service.update(taskItem, taskItem.taskId)
      .subscribe(
        response => {
          console.log(response);
        });
  }

  deleteTaskItem(taskItem: TaskItem) {
    // optimistic update 
    let index = this.taskItems.indexOf(taskItem);
    this.taskItems.splice(index, 1);

    this.service.delete(taskItem.taskId)
      .subscribe(
        response => {
        },
        (error: AppError) => {
          this.taskItems.splice(index, 0, taskItem);

          if (error instanceof NotFoundError)
            alert('This task has already been deleted')
          else throw error;
        });
  }

  onStateClick(taskItem: TaskItem) {
    if (taskItem.state == 0) { taskItem.state = 1; }
    this.updateTaskItem(taskItem);
    console.log("task done");
  }
}
  
interface TaskItem {
  taskId: number,
  taskTitle: string;
  category: string;
  description: string;
  dueDate: Date;
  doneDate: Date;
  state: number;
  seriesType: number;
}



