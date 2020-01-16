import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getTaskItems() {
    return this.http.get(this.url)
  };

  createTaskItems(taskItem) {
    return this.http.post(this.url, JSON.stringify(taskItem))
  };

  updateTaskItems(taskItem) {
    return this.http.patch(this.url + '/' + taskItem.id, JSON.stringify({ isRead: true }))
    //this.http.put(this.url + '/' + taskItem.id, JSON.stringify(taskItem))
  };

  deleteTaskItems(id) {
    return this.http.delete(this.url + '/' + id)
  };

}
