import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Candidate } from 'src/app/entities/candidate';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { CandidateService } from 'src/app/services/candidate.service';
@Component({
  selector: 'app-candidate-feedback',
  templateUrl: './candidate-feedback.component.html',
  styleUrls: ['./candidate-feedback.component.scss']
})
export class CandidateFeedbackComponent implements OnInit {

  candidateList: Candidate[];
  constructor(private employeeService:EmployeeService, private candidateService: CandidateService) { 
    this.listofCandidates();
  }

  listofCandidates(){
    this.candidateService.getCandidates().subscribe(
      data => {
        console.log(data); 
        this.candidateList= data;
      })
    }

  onSubmit(formData:any)
  {
    // console.log(formData);
    this.employeeService.addCandidateFeedback(formData).subscribe(
      (response:any)=>{
        console.log(response);
        alert(JSON.stringify(response));
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  ngOnInit(): void {
  }

}
