import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, AuthService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit {
  id!: number;
  displayedColumns : string[]  = ['id','firstName','lastName','email','roles','action'];
  actions!: string ;

  dataSource = new MatTableDataSource<User>();

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private user: AuthService, private authService: AuthService) {

  }

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    (await this.user.getUsers()).subscribe((x) => {
      console.log(x)
      if (x.length==0)
      {
        alert("no user exist");
        this.router.navigate(['/admin/home'])
      }
      else
      localStorage.setItem("nbusers",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.authService.logout(),
          console.log(err),
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
  async deleteuser(){
    console.log(typeof(JSON.parse(localStorage.getItem('user to delete')!))),
    (await this.authService.deleteUser(JSON.parse(localStorage.getItem('user to delete')!)))
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
localStorage.setItem('user to manage', JSON.stringify(user.id));

  }
 
}