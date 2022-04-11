import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from 'src/app/entities/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  candidates: Candidate[];
  allCandidates: Candidate[] = [];
  selectedCandidates: Candidate[] = [];
  candidateName: String;
  p: number = 1;
  constructor(private candidateService: CandidateService , public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listOfCandidates();
  }
  sc: boolean = false;
  schedule() {
    this.sc = true;
  }
  getschedule() {
    return this.schedule;
  }
  getCandidateName(val: string) {
    this.candidateName = val;
    console.log(this.candidateName);
  }

  listOfCandidates() {
    this.candidateService.getCandidates().subscribe(
      data => {
        this.candidates = data;
        this.allCandidates = data;
      }
    )
  }

  getCandidates() {
    console.log("Get Candidates Working");
    if (this.candidateName != "" && this.candidateName != null) {
      for (var candidate of this.allCandidates) {
        if (candidate.name.toLowerCase() === this.candidateName.toLowerCase()) {
          this.selectedCandidates.push(candidate);
        }
      }
      if(this.selectedCandidates.length>0)
      {
       this.candidates = this.selectedCandidates;
       this.selectedCandidates = [];
      }
      else{
        this.openSnackBar("No Records Found","act");
      }
    }
    if(this.candidateName=="")
    {
      this.candidates=this.allCandidates;
    }
  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
    });  
  } 
  

}
