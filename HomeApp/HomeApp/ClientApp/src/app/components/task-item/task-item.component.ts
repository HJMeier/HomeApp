import { Component, OnInit } from '@angular/core';
import { TaskItemService } from '../../services/task-item.service';
import { AppError } from '../../common/app-error';
import { NotFoundError } from '../../common/not-found-error';
import { BadInput } from '../../common/bad-input';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  form = new FormGroup({
    'name': new FormControl(),
    'category': new FormControl(),
    'description': new FormControl(),
    'dueDate': new FormControl()
  });

  taskItems: TaskItem[];

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
    let taskItem = {
      title: this.form.value.name,
      category: this.form.value.category,
      description: this.form.value.description,
      dueDate: this.form.value.dueDate,
      doneDate: new Date(),
      state: 0,
      series: 0
    }; //assign value to local varibale
    this.form.reset();
    //optimistic update already here, will be withdrawn in case of error
    this.taskItems.splice(0, 0, taskItem);

    //taskName.value = ''; //delete input after assessing value

    this.service.create(taskItem)
      .subscribe(
        response => {
          taskItem['id'] = response;

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

  updateTaskItem(taskItem) {
    this.service.update(taskItem)
      .subscribe(
        response => {
          console.log(response);
        });
  }

  deleteTaskItem(taskItem) {
    // optimistic update 
    let index = this.taskItems.indexOf(taskItem);
    this.taskItems.splice(index, 1);

    this.service.delete(taskItem.id)
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

}
  
interface TaskItem {
  title: string;
  category: string;
  description: string;
  dueDate: Date;
  doneDate: Date;
  state: number;
  series: number;

}



