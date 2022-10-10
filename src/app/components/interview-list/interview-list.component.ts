import { Component, OnInit } from '@angular/core';
import { ScheduledInterviews } from 'src/app/entities/scheduled-interviews';
import { SlotList } from 'src/app/entities/slot-list';
import { ScheduledInterviewService } from 'src/app/services/scheduled-interview.service';
import { SlotListService } from 'src/app/services/slot-list.service';
import { Candidate } from 'src/app/entities/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DownloadCsvService } from 'src/app/services/download-csv.service';
import { Time } from '@angular/common';
import { DatePipe } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillsService } from 'src/app/panelist/viewskill/skills.service';
import { Skills } from 'src/app/panelist/viewskill/skills';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/entities/employee';
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  constructor(public datepipe : DatePipe,private downloadCsvServive : DownloadCsvService,private skillService: SkillsService,
    private slotListService : SlotListService, public snackBar : MatSnackBar, public empService: EmployeeService, public candidateService: CandidateService) { 
      this.listOfinterviews();
    }


  slots : any;
  allSlots : SlotList[]=[];
  selectedSlots : SlotList[]=[];
  ProperSlots: SlotList[]=[];
  p : number =1;
  empEid: string;
  employee: any;
  candidateEid: string;
  candidate: any;  
  JsonArray: any = [];
  empName : string;
  candidateName : string;
  candidateEmail : string;
  employeeName : string;
  employeeEmail : string;
  date : Date=new Date();
  time : Time;
  round : string;
  skills : any;
  displayer : SlotList[];
  JsonFields = ["employeeName", "employeeEmail", "candidateName","candidateEmail","date", "time", "round","date", "skills"];
  JsonToCSV() {
    var csvStr = this.JsonFields.join(",") + "\n";
    for (var v of this.JsonArray) {
      this.employeeName = v.employeeName;
      this.employeeEmail = v.employeeEmail;
      this.candidateName = v.candidateName;
      this.candidateEmail = v.candidateEmail;
      this.time = v.time;
      this.round = v.round;
      this.date = v.date;
      // this.skills = this.getSkillsByEmailId(v.employeeEmail);
      let date_string = this.datepipe.transform(this.date, 'yyyy-MM-dd');    
      csvStr += this.employeeName + ',' + this.employeeEmail + ',' + this.candidateName + ',' + this.candidateEmail + ',' + date_string + ',' + this.time + ',' + this.round + ',' + this.skills + "\n";
    }
    return csvStr;
  }
  downloadFile() {
    console.log(this.JsonArray);
    this.downloadfile(this.JsonToCSV());
    //console.log(this.JsonArray);
    //this.downloadfile(this.JsonToCSV())
  }
  ngOnInit(): void {
    this.downloadCsvServive.downloadFile().subscribe(
      data => {
        this.JsonArray = data;
      }
    )
  }
  downloadfile(csvStr: any) {

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'output.csv';
    hiddenElement.click();
  }

  public getSkillsByEmailId(email:String){
    this.skillService.getSkillsByEmail(email).subscribe(
      (response: Skills[]) =>{
        this.skills = response;
        console.log(this.skills);
      },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
}
  getEmployee(id: any):void
  {
     this.empService.getEmployeebyId(id).subscribe(
      (response: Employee)=>{
        this.employee = response;
        console.log(this.employee);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      },
    )
  }
  getEmployeeId(id: string)
  {
    this.employee = this.empService.getEmployeebyId(id).subscribe();
    this.empEid= this.employee.employeeEmail;
    return this.empEid;
  }
  getCandidateName(id: number)
  {
     this.candidate = this.candidateService.getCandidateById(id);
     this.empName = this.employee.employeeName;
    return this.candidateName; 
  }
  getCandidateID(id: number)
  {
    this.candidate = this.candidateService.getCandidateById(id);
    this.candidateEid= this.candidate.candidateEmail;
    return this.candidateEid;
  }

  getSkills(id: String)
  {
    this.skills = this.skillService.getSkillsbyEmpId(id);
    return this.skills;
  }

  public listOfinterviews(){
    this.slotListService.getSlotList().subscribe(
      data => {
        this.slots = data;
        console.log(this.slots);
        for(let i =2;i<this.slots.length;i++)
        {
          // console.log(this.slots[i].empId);
          // this.getEmployee(this.slots[2].empId)
          console.log(this.slots[i].empId);
          this.employee = this.empService.getEmployeebyId('INT833');
          console.log(this.employee);
          // this.ProperSlots[i].employeeName = this.employee;
          // this.ProperSlots[i].employeeEmail = this.getEmployeeId(this.slots[2].empId);
          // this.ProperSlots[i].candidateName = this.getCandidateName(1);
          // this.ProperSlots[i].candidateEmail= this.getCandidateID(2);
          this.ProperSlots[i].date= this.slots[i].date;
          this.ProperSlots[i].time= this.slots[i].time;
          this.ProperSlots[i].round= this.slots[i].round;
          // this.ProperSlots[i].skills = this.getSkills(this.slots[i].em);
        }
        console.log(this.ProperSlots);
        this.allSlots = data;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  getSlot()
  {
    console.log("get slot working");
    
    if(this.empName!= ""  && this.empName != null)
    { console.log("Inside empName");
      for(var slot of this.slots)
      {
        // if(slot.employeeName.toLowerCase()===this.empName)
          this.selectedSlots.push(slot);
      }
      if(this.selectedSlots.length>0)
      {
        this.slots=this.selectedSlots;
      }
      else{
        this.openSnackBar("No Records Found","act");
      }
    }
    if(this.empName == "")
    {
      this.slots=this.allSlots;
    }
  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
    });  
   }

}
