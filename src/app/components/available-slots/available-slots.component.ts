import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skills } from 'src/app/panelist/viewskill/skills';
import { AvailableSlotsService } from 'src/app/services/available-slots.service';
import { AvailableSlots } from 'src/app/utility/AvailableSlots';
import { SkillsService } from 'src/app/panelist/viewskill/skills.service';
import { Onlyskills } from 'src/app/panelist/viewskill/onlyskills';
import { employeeSkillMapper } from 'src/app/utility/employeeSkillMapper';
// import { AvailableSlotsWithSkill } from 'src/app/utility/AvailableSlotsWithSkill';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.scss']
})
export class AvailableSlotsComponent implements OnInit {

  AllSkills : Onlyskills[]
  employeeName : string
  slots : AvailableSlots[]
  selectedSlots : AvailableSlots[]=[];
  allData : AvailableSlots[]=[]
  skills: any
  auxSkills: any
  empSkillMapper: employeeSkillMapper[]=[];
  selectedEmpSkillMaps: employeeSkillMapper[]= [];
  skilling: string[]
  skillMapper: any;
  aux: string[]
  p: number = 1;
  employeeId: string;
  constructor(private slotsService : AvailableSlotsService , public snackBar: MatSnackBar, public skillService: SkillsService) { }

  ngOnInit(): void {
    this.getSlots();
    this.getSkills();
    
  }

   getSkills(){
    this.skillService.getAllSkills().subscribe((data: Onlyskills[])=>{
    this.AllSkills = data;
    console.log(this.AllSkills)
    this.skillMapper = new Map<number,string>()

    for(let k=0;k<this.AllSkills.length;k++)
    {
      this.skillMapper.set(this.AllSkills[k].skillId,this.AllSkills[k].skill);
    }
    this.getAllSkills();
   })}
   
   getAllSkills(){
    this.skillService.getAllData().subscribe((data: any)=>{
      this.skilling = data;
      console.log(this.skilling[0]["employeeId"]);
      
      for(let m=0;m<this.skilling.length;m++)
      {
        const emplObj = {"employeeId" : this.skilling[m]["employeeId"],"skill" : this.skillMapper.get(this.skilling[m]["skillId"])}
        this.empSkillMapper.push(emplObj);
      }
      console.log(this.empSkillMapper);
    })
   }


   getSlots()
   {
     
    return this.slotsService.allSlots().subscribe(data=>{
      this.allData=data;
      for (let i = 0; i < this.allData.length; i++){
        
        // this.skillService.getSkillsbyEmpId(this.allData[i].employeeId).subscribe(data=>{
        //   this.skills = data;
        //   }) 
      }
      this.slots =this.allData;
    // return this.slotsService.allSlots().subscribe(data=>{
    //   this.slots=data;
    // })
   })}
    
  

  getEmployeeName(name: string )
  {
    this.employeeName = name;
    console.log(name);   
  }

  getEmployeeId(Id: string)
  {
    this.employeeId = Id;
    console.log(Id);
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
getEmployeeSkills()
 {
  if(this.employeeId != null && this.employeeId !='')
  {
    
    for(var slot of this.empSkillMapper)
    {   
      if(slot.employeeId === this.employeeId)
      {
        console.log(slot.employeeId); 
        this.selectedEmpSkillMaps.push(slot);
      }
    }
    console.log(this.selectedEmpSkillMaps);
    
    if(this.selectedEmpSkillMaps.length > 0)
    {
      this.empSkillMapper=this.selectedEmpSkillMaps;
      this.selectedEmpSkillMaps=[];
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