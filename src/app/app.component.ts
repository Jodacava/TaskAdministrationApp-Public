import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './interfaces/interfaces/task';
import { TaskService } from './services/services/task.service';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  taskList:Task[] = [];
  taskForm:FormGroup;
  taskFormFinder:FormGroup;
  searchParam!: number;

  constructor(
    private taskServices:TaskService,
    private taskFormulary:FormBuilder,
    private taskFormFind:FormBuilder
  ){
    this.taskForm = this.taskFormulary.group({
      id: ["0",Validators.required],
      name: ["",Validators.required]
    })
    this.taskFormFinder = this.taskFormFind.group({
      id: ["0"]
    })
  }
  getAllTask(){
    this.taskServices.getList().subscribe({
      next:(data)=> {
        this.taskList = data;
      },error:(e) =>{console.log("No tasks listed")}
    })
  }

  ngOnInit(): void {
    this.getAllTask();
  }

  getOne(){
    var taskId = this.searchParam
    console.log(taskId)
    if(taskId == 0){
      this.getAllTask();
      return
    }    
    this.taskServices.getOne(taskId).subscribe({
      next:(data)=> {
        const newTaskList = this.taskList.filter(item => item.id == taskId)
        this.taskList = newTaskList;
      },error:(e) =>{console.log("No task found")}
    })
  }

  addTask(){
    const request:Task = {
      id: this.taskForm.value.id,
      name: this.taskForm.value.name
    }
    this.taskServices.add(request).subscribe({
      next:(data)=> {
       this.taskList.push(data);
       this.taskForm.patchValue({
         id:0,
         name:""
       })
      },error:(e) =>{console.log("No task added")}
    })
  }

  modifyTask(task:Task){
    this.taskServices.edit(task).subscribe({
      next:(data)=> {
        const newTaskList = this.taskList.filter(item => item.id == task.id);
        newTaskList.push(data);
        this.taskList = newTaskList;
      },error:(e) =>{console.log("No task edited")}
    })
  }

  deleteTask(task:Task){
    this.taskServices.delete(task.id).subscribe({
      next:(data)=> {
        const newTaskList = this.taskList.filter(item => item.id != task.id)
        this.taskList = newTaskList;
      },error:(e) =>{console.log("No task deleted")}
    })
  }

}