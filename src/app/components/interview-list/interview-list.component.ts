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
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  slots : SlotList[];
  allSlots : SlotList[]=[];
  selectedSlots : SlotList[]=[];
  p : number =1;
  constructor(public datepipe : DatePipe,private downloadCsvServive : DownloadCsvService,
    private slotListService : SlotListService, public snackBar : MatSnackBar) { }
  JsonArray: any = [];
  empName : string;
  candidateName : string;
  candidateEmail : string;
  employeeName : string;
  employeeEmail : string;
  date : Date=new Date();
  time : Time;
  round : string;
  JsonFields = ["employeeName", "employeeEmail", "candidateName","candidateEmail","date", "time", "round"];
  JsonToCSV() {
    var csvStr = this.JsonFields.join(",") + "\n";
    for (var v of this.JsonArray) {

      this.employeeName = v.employeeName;
      this.employeeEmail = v.employeeEmail;
      this.candidateName = v.candidateName;
      this.candidateEmail = v.candidateEmail;
      this.time = v.time;
      this.round = v.round;
      this.date =v.date;
      
      let date_string = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      console.log(typeof(date_string));
      csvStr += this.employeeName + ',' + this.employeeEmail + ',' + this.candidateName + ',' + this.candidateEmail + ',' + date_string + ',' + this.time + ',' + this.round + "\n";

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
    this.listOfinterviews();
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

  getEmployeeName(name: string )
  {
    this.empName = name;
    console.log(name);
    
  }

  listOfinterviews() {
    this.slotListService.getSlotList().subscribe(
      data => {
        this.slots = data;
        this.allSlots = data;
      }
    )
  }

  getSlot()
  {
    console.log("get slot working");
    
    if(this.empName!= "" && this.empName != null)
    {
      for(var slot of this.allSlots)
      {
        if(slot.employeeName.toLowerCase()===this.empName)
        {
          this.selectedSlots.push(slot);
        }
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
