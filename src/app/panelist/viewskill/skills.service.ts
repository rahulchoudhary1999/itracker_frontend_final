import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Onlyskills } from './onlyskills';
import { Skills } from './skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private employeeId=localStorage.getItem("employeeId");

  private baseUrl = `http://localhost:8080/api/v1/employee/skill/e_id/${this.employeeId}`;

  constructor(private http: HttpClient) { }

  getAllData():Observable<any>{
    return this.http.get<Skills[]>(`http://localhost:8080/api/v1/employee/skill/`);
  }
  getSkillsByEmail(email?:String):Observable<any>{
    console.log(`http://localhost:8080/api/v1/employee/e_id/${email}`);
    return this.http.get<Skills[]>(`http://localhost:8080/api/v1/employee/e_id/${email}`);
  }
  getSkillsByEmpId(): Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.baseUrl}`);
  }
  
  getSkillsbyEmpId(Id: String): Observable<Skills[]>{
    return this.http.get<Skills[]>(`http://localhost:8080/api/v1/employee/skill/e_id/${Id}`);
  }
  deleteSkill(Id?:number):Observable<any>{
    console.log(`http://localhost:8080/api/v1/employee/skill/${Id}`);
    return this.http.delete<any>(`http://localhost:8080/api/v1/employee/skill/r_id/${Id}`);
  }
  
  addSkill(skill:Skills): Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/v1/employee/skill/`,skill);
  }
  
  getAllSkills():Observable<Onlyskills[]>{
    return this.http.get<Onlyskills[]>('http://localhost:8080/api/v1/employee/skill/showAll');
  }
}
