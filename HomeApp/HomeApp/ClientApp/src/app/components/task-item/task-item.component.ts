import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  taskItems: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    http.get(this.url)
      .subscribe(response => {
        this.taskItems = response;
      })
  }

  createTaskItem(input: HTMLInputElement) {
    let taskItem = { title: input.value };
    input.value = '';
    this.http.post(this.url, JSON.stringify(taskItem))
      .subscribe(response => {
        taskItem['id'] = response;
        this.taskItems.splice(0, 0, taskItem);
      })
  }

  updateTaskItem(taskItem) {
    this.http.patch(this.url + '/' + taskItem.id, JSON.stringify({ isRead: true }))
      //this.http.put(this.url + '/' + taskItem.id, JSON.stringify(taskItem))
      .subscribe(response => {
        console.log(response);
      })
  }

  deleteTaskItem(taskItem) {
    this.http.delete(this.url + '/' + taskItem.id)
      .subscribe(response => {
        let index = this.taskItems.indexOf(taskItem);
        this.taskItems.splice(index, 1);
      })
  }

  ngOnInit() {
  }

}
