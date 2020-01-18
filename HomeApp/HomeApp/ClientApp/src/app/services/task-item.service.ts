import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService extends DataService{

  constructor(http: HttpClient) {
    super('https://jsonplaceholder.typicode.com/posts',http);//super: instance of base class
  } 
}

