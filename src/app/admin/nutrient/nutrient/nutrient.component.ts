import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Symptom } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';
import { AuthService} from 'src/app/client/Services/RestUser.service';
import { RestNutrientService, Nutrient  } from './../../../client/Services/rest-nutrient.service';

@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.css']
})
export class NutrientComponent implements OnInit {
  displayedColumns = ['id','name','tenor','unity'];
  dataSource = new MatTableDataSource<Nutrient>();
  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private user: RestNutrientService, private authService: AuthService) { }
  @ViewChild(MatSort) sort!: MatSort;
      async ngOnInit() {
      (await this.user.getNutrients()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no  exist");
          this.router.navigate(['/home'])
        }
        else{}
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.sort = this.sort;
  
      },
        err => {
         /*  this.authService.logout(),
            console.log(err),
            this.failNotification();
          */
  
        }
      )
  };

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
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
  

 

}
