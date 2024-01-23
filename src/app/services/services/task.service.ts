import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "Task/"

  constructor(private http:HttpClient) { }

  getList():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}List`)
  }

  getOne(taskId:number):Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}Find/${taskId}`);
  }

  add(request:Task):Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}Add`,request);
  }

  edit(request:Task):Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}Edit`,request);
  }

  delete(taskId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}Delete/${taskId}`);
  }
}
