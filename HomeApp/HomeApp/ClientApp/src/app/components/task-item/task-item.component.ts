import { Component, OnInit } from '@angular/core';
import { TaskItemService } from '../../services/task-item.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  taskItems: any[];

  constructor(private service: TaskItemService) { //separation of concerns -> not directly use http here...
    // no call of http services in constructor!
    ;
  }

  createTaskItem(input: HTMLInputElement) {
    let taskItem = { title: input.value };
    input.value = '';
    this.service.createTaskItems(taskItem)
      .subscribe(response => {
        taskItem['id'] = response;
        this.taskItems.splice(0, 0, taskItem);
      })
  }

  updateTaskItem(taskItem) {
    this.service.updateTaskItems(taskItem)
      .subscribe(response => {
        console.log(response);
      })
  }

  deleteTaskItem(taskItem) {
    this.service.deleteTaskItems(taskItem.id)
      .subscribe(response => {
        let index = this.taskItems.indexOf(taskItem);
        this.taskItems.splice(index, 1);
      })
  }

  ngOnInit() {
    this.service.getTaskItems()
      .subscribe(response => {
        this.taskItems = response;
      })
  }
}



