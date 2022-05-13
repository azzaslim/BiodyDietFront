import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User, RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit {
  id!: number;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'typeUser', 'action', 'modulePresc'];
  actions!: string;
  souscriptionForm!: FormGroup;
  checked!: boolean;
  dataSource = new MatTableDataSource<User>();
edit_url!: string;
  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestUserService: RestUserService) {
    this.souscriptionForm = new FormGroup({
      souscription: new FormControl()
    });
  }

  @ViewChild(MatSort) sort!: MatSort;


  async ngOnInit() {

    (await this.RestUserService.getUsers()).subscribe((x) => {
     console.log("tableau",x)
      if (x.length == 0) {
        alert("no user exist");
        this.router.navigate(['/admin/home'])
      }
      else
        localStorage.setItem("nbusers", x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.RestUserService.logout(),
          // console.log(err),
          this.failNotification();
        // this.showToasterError();

      }
    )
  }
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
        this.deleteuser()
        Swal.fire('cet utilisateur a été supprimé', '', 'success')
      }
    })
  }
  async deleteuser() {
    (await this.RestUserService.deleteUser(JSON.parse(localStorage.getItem('user to manage')!)))
      .subscribe(
        async response => {
          console.log(response)
          this.router.navigate(['/admin/users/listeusers'])
          this.ngOnInit()
        },
        err => {
          console.log(err)
        })

  }


  async userToManage(user: User) {
    console.log(user);
   
        (localStorage.setItem('user to manage', JSON.stringify(user.id)));
        (localStorage.setItem('usertoupdate', JSON.stringify(user)));


  }


  async checkValue(id: any) {
    (await this.RestUserService.getUser(id)).subscribe(
      async response => {
       // localStorage.setItem('user to manage', JSON.stringify(id));

       
        if ((response[0]['modulePresc'] === true)) 
          { let data=false;
            (await this.RestUserService.updateUser(JSON.stringify({ souscription: data })))
            .subscribe(
              response => {
                console.log(response)
              },
              err => console.log(err) )
          }
      else {
        let data=true;
        (await this.RestUserService.updateUser(JSON.stringify({ souscription: data })))
        .subscribe(
            (response: any) => {
              console.log(response)
            })
        }



      

  })}

  async updateUser() {
    let data = this.dataSource.data[JSON.parse(localStorage.getItem('user to manage')!)].modulePresc;
    //let data = this.souscriptionForm.controls.souscription.value;
    // console.log(typeof(JSON.parse(localStorage.getItem('user to manage')!))),
    //console.log(data);
    (await this.RestUserService.updateUser(JSON.stringify({ souscription: data })))
      .subscribe(
        (response: any) => {
          // console.log(JSON.stringify(response)),
          localStorage.setItem('usertoupdate', JSON.stringify(response))
          this.router.navigate(['/admin/users/listeusers'])
        },


      )
  }

}