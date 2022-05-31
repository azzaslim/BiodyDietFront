
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestGroupService } from 'src/app/client/Services/rest-group.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-details-group-users',
  templateUrl: './details-group-users.component.html',
  styleUrls: ['./details-group-users.component.css']
})
export class DetailsGroupUsersComponent implements OnInit {
  id!: number;
  group_name!:string;
  createdAt!:string;
  modifiedAt!:string;

constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestGroupService: RestGroupService, private datePipe :DatePipe ) {

}

@ViewChild(MatSort) sort!: MatSort;

async ngOnInit() {
 (await this.RestGroupService.getOneGroup(JSON.parse(localStorage.getItem('group to manage')!))).subscribe(
   response => {
     console.log(response)    
        
         this.getInfoGroup()

   })
}
async getInfoGroup(){

 this.group_name= JSON.parse(localStorage.getItem('grouptoupdate')!)['group_name'],
 /* this.comment= JSON.parse(localStorage.getItem('grouptoupdate')!)['comment'],
 this.composition= JSON.parse(localStorage.getItem('grouptoupdate')!)['composition'], */
 this.createdAt= this.datePipe.transform(JSON.parse(localStorage.getItem('grouptoupdate')!)['created_at'], 'dd/MM/yyyy')!
 this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('grouptoupdate')!)['modifiedAt'], 'dd/MM/yyyy')!
}




}
