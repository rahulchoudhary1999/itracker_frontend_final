import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiServerUrl=environment.baseUrl;
  private id=localStorage.getItem("employeeId");
  constructor(private http:HttpClient) { }

  public getEmployees():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/employee/`)
  }
  public getEmployeeById():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/employee/${this.id}`)

  }

  public getEmployeebyId(Id:string):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/employee/${Id}`);
  }
  public addSlot(data:any):Observable<any>{
    // console.log("Data received"+data);
    const headerOptions = new HttpHeaders();
    headerOptions.set('Content-Type', 'application/json');
    return this.http.post(`${this.apiServerUrl}/api/v1/slot/${this.id}`,data,{headers: headerOptions});
  }
  public getOnGoingScheduledInterviewById():Observable<any>{
    // return this.http.get<any>(`${this.apiServerUrl}/api/v1/scheduledInterview/onGoing`);
    return this.http.get<any>(`${this.apiServerUrl}/employee/interview/ongoing/${this.id}`);
  }
  public getCompletedScheduledInterviewById():Observable<any>{
    //return this.http.get<any>(`${this.apiServerUrl}/api/v1/scheduledInterview/completed`);
    return this.http.get<any>(`${this.apiServerUrl}/employee/interview/completed/${this.id}`);
  }
  
  public addCandidateFeedback(data:any):Observable<any>{
    const headerOptions = new HttpHeaders();
    headerOptions.set('Content-Type', 'application/json');
   // return this.http.post(`${this.apiServerUrl}/api/v1/employee/candidateFeedback`,data,{headers: headerOptions});
    return this.http.post(`${this.apiServerUrl}/candidateFeedback`,data,{headers: headerOptions});
  }
  public getSlotsById():Observable<any>{
    return  this.http.get<any>(`${this.apiServerUrl}/api/v1/slot/${this.id}`);
  }
}
