import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

// imported manually, error handling
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/catch'; --> old! don't use anymore
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError))
  };

  create(resource) {
    //define options used in http.post method -> make sure type is recognized as json (otherwhise theremay be alarm about wrong media type)
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(this.url, JSON.stringify(resource), options)
      .pipe(catchError(this.handleError))
  };

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(catchError(this.handleError))
    //this.http.put(this.url + '/' + taskItem.id, JSON.stringify(taskItem))
  };

  delete(id) {
    // use this to simulate error: return Observable.throw(new AppError());

    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError)) //reference (without ()) of this method )
  };

  private handleError(error: Response) {

    if (error.status === 400)
      //return Observable.throw(new BadInput(error));
      return throwError(new BadInput(error));

    if (error.status === 404)
      //return Observable.throw(new NotFoundError());
      return throwError(new NotFoundError());

    //return Observable.throw(new AppError(error));
    return throwError(new AppError(error));
  }
}

