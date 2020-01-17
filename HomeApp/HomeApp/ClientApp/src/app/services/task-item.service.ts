import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

// imported manually, error handling
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/catch'; --> old! don't use anymore
import { catchError } from 'rxjs/operators';
import { BadInput } from '../common/bad-input';

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
      .pipe(catchError((error: Response) => {
        if (error.status === 400)
          return Observable.throw(new BadInput(error.json()));

        return Observable.throw(new AppError(error.json()));
      }))
  };

  updateTaskItems(taskItem) {
    return this.http.patch(this.url + '/' + taskItem.id, JSON.stringify({ isRead: true }))
    //this.http.put(this.url + '/' + taskItem.id, JSON.stringify(taskItem))
  };

  deleteTaskItems(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError((error: Response) => {
        if (error.status === 404)
          return Observable.throw(new NotFoundError());
        return Observable.throw(new AppError(error));
      }))
  };

}
