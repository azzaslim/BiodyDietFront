import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  RestUserService } from 'src/app/auth.service';
import { Group, RestGroupService } from 'src/app/client/Services/rest-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-users-group',
  templateUrl: './liste-users-group.component.html',
  styleUrls: ['./liste-users-group.component.css']
})

export class ListeUsersGroupComponent implements OnInit {

  displayedColumns = ['id','group_name','action'];
  dataSource = new MatTableDataSource<Group>();
  selection = new SelectionModel<Group>(false, []);
  
  groups!:string;
   list=[];

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private dialog: MatDialog, private Group: RestGroupService, private authService: RestUserService) { }
  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
     // this.getOneGroup();
      (await this.Group.getGroups()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no group exist");
          this.router.navigate(['/home'])
        }
        else
      localStorage.setItem("nbgroups",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      );
     
      };

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  ConfirmationNotification() {
    
    Swal.fire({
      title: 'Etes-vous sur ?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Supprimer',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
    this.deleteGroup();
    Swal.fire('ce group a été supprimé', '', 'success');
    } 
    })
      }
 
  async groupToManage(group: Group) {
     localStorage.setItem('group to manage', JSON.stringify(group.id));
     localStorage.setItem('grouptoupdate', JSON.stringify(group));
   }
  
  confirmBox(){
    Swal.fire({
      title: 'votre session a expirée',
      text: 'veuillez reconnecter s\' il vous plait  !!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok!',
    }).then((result) => {
     
        this.authService.logout()
      
    })
  }
  // async openDialog(): Promise<void> {
    
  //   const dialogRef = this.dialog.open(AddgroupComponent, {
  //     width: '50%',
  //     height: '55%',
  //     data: {},
  //   });
  // }

  async deleteGroup(){
    //console.log(typeof(JSON.parse(localStorage.getItem('group to manage')!))),
    (await this.Group.deleteGroup(JSON.parse(localStorage.getItem('group to manage')!)))
    .subscribe(
      async response => {
       console.log(response)
       this.router.navigate(['/admin/groupes/usersgrouplist'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  search(id :string){
    console.log(id);
     }
     async getOneGroup(){
     ( (await (this.Group.getOneGroup(JSON.parse(localStorage.getItem('group to manage')!)))).subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
  
    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      
      )
      )
      //this.groups =JSON.parse(localStorage.getItem('group')!);
     /* this.list.forEach(element => {
        console.log(element);
      }); */
      //this.groups =JSON.parse(localStorage.getItem('group')!)['group']['group_name'];
    //console.log(this.groups);

    }
    
  

}
