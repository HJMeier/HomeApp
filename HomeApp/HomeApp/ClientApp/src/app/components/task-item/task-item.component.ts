import { Component, OnInit } from '@angular/core';
import { TaskItemService } from '../../services/task-item.service';
import { AppError } from '../../common/app-error';
import { NotFoundError } from '../../common/not-found-error';
import { BadInput } from '../../common/bad-input';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  taskItems: TaskItem[];

  constructor(private service: TaskItemService) { //separation of concerns, use service -> not directly use http here...
    // no call of http services in constructor!
    ;
  }

  createTaskItem(input: HTMLInputElement) {
    let taskItem = { title: input.value }; //assign value to local varibale
    input.value = ''; //delete input after assessing value

    this.service.createTaskItems(taskItem)
      .subscribe(
        response => {
          taskItem['id'] = response;
          this.taskItems.splice(0, 0, taskItem);
        },
        (error: Response) => {
          if (error instanceof BadInput) {
            //this.form.setErrors(error.originalError)
          }
            else {
            //alert function not best, since window will be frozen... -> save log to db
            alert('An unexpected error occurred.');
          }
        }
      );
  }

  updateTaskItem(taskItem) {
    this.service.updateTaskItems(taskItem)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          alert('An unexpected error occurred.');
        });
  }

  deleteTaskItem(taskItem) {
    this.service.deleteTaskItems(taskItem.id)
      .subscribe(
        response => {
          let index = this.taskItems.indexOf(taskItem);
          this.taskItems.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError)
            alert('This task has already been deleted')
          else {
            alert('An unexpected error occurred.');
          }
        });
  }

  ngOnInit() {
    this.service.getTaskItems()
      .subscribe(response => {
        this.taskItems = response;
      },
        error => {
          alert('An unexpected error occurred.');
        });
  }

}
  
interface TaskItem{
  title: string;
}



