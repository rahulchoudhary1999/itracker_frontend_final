import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvailableSlotsService } from 'src/app/services/available-slots.service';
import { AvailableSlots } from 'src/app/utility/AvailableSlots';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.scss']
})
export class AvailableSlotsComponent implements OnInit {

  employeeName : string
  slots : AvailableSlots[]
  selectedSlots : AvailableSlots[]=[];
  allData : AvailableSlots[]=[]
  p: number = 1;
  constructor(private slotsService : AvailableSlotsService , public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSlots();
  }
  
   getSlots()
   {
     this.slotsService.allSlots().subscribe(data=>{
      this.allData=data;
    })

    return this.slotsService.allSlots().subscribe(data=>{
      this.slots=data;
    })
   }

  getEmployeeName(name: string )
  {
    this.employeeName = name;
    console.log(name);
    
  }

  getEmployee()
  {
    if(this.employeeName != null && this.employeeName !='')
    {
      
      for(var slot of this.allData)
      {   
        if(slot.name.toLowerCase() === this.employeeName.toLowerCase())
        {
          console.log(slot.name); 
          this.selectedSlots.push(slot);
        }
      }
      console.log(this.selectedSlots);
      
      if(this.selectedSlots.length > 0)
      {
        this.slots=this.selectedSlots;
        this.selectedSlots=[];
      }
      else{
        this.openSnackBar("No Records Found","act");
      }
    }
   
 }

 openSnackBar(message: string, action: string) {  
  this.snackBar.open(message, action, {  
     duration: 2000,  
  });  
 }
}