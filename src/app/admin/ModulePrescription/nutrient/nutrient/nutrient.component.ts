import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

import { RestNutrientService, Nutrient  } from '../../../../client/Services/rest-nutrient.service';
import { AddNutrientComponent } from '../add-nutrient/add-nutrient.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from 'src/app/loading.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.css']
})
export class NutrientComponent implements OnInit {
  displayedColumns = ['id','name','tenor','unity','action'];
  actions!: string ;
  dataSource = new MatTableDataSource<Nutrient>();
  loading$ = this.loader.loading$;
  fileData!: File ;
  previewUrl!:any ;
  ImageUrl!:any ;
  
  fileUploadProgress!: string ;
  uploadedFilePath!: string;
   reader = new FileReader();      
  path!:any;
 

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private nutrient: RestNutrientService, private restnutrient: RestNutrientService,private dialog: MatDialog, private authservice: RestUserService,private loader: LoadingService,private http: HttpClient,private RestUserService: RestUserService) { }
  @ViewChild(MatSort) sort!: MatSort;
      async ngOnInit() {
        this.loader.show();
      (await this.nutrient.getAdminNutrients()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no  exist");
          this.router.navigate(['/admin/home'])
        }
        else
      localStorage.setItem("nbnutrients",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
      this.loader.hide()

    },
      err => {
        this.authservice.logout(),
          console.log(err),
          this.failNotification();
        // this.showToasterError();

      }
      )
  };

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
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
this.deletenutrient()
Swal.fire('ce nutriment a été supprimé !', '', 'success')
} 
})
  }
  async deletenutrient(){
    console.log(typeof(JSON.parse(localStorage.getItem('nutrient to manage')!))),
    (await this.restnutrient.deleteNutrient(JSON.parse(localStorage.getItem('nutrient to manage')!)))
    .subscribe(
      async response => {
       console.log(response)
       this.router.navigate(['/admin/nutrient/nutrientlist'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  async nutrientToManage(nutrient: Nutrient) {
    localStorage.setItem('nutrient to manage', JSON.stringify(nutrient.id));
    localStorage.setItem('nutrienttoupdate', JSON.stringify(nutrient));
  }
  async openDialog(): Promise<void> {
    
        const dialogRef = this.dialog.open(AddNutrientComponent, {
          width: '50%',
          height: '55%',
          data: {},
        });
     
        
      
      }
    
      preview() {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
          console.log(mimeType)
          return;
        }
        this.reader.readAsDataURL(this.fileData); 
        console.log(this.fileData)
        this.reader.onload = (_event) => { 
          this.previewUrl = this.reader.result; 
          localStorage.setItem('previewUrl',this.previewUrl)
        }
       }
       async onSubmit() {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.RestUserService.getToken(),
       
        });
       const formData = new FormData();
       formData.append('myfile', this.fileData);
       
       this.fileUploadProgress = '0%';
       await this.http.post('http://localhost:8000/api/importnutrient',formData,{reportProgress: true,headers, observe: 'events'})
       .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(  100) + '%';
          console.log(this.fileUploadProgress);
          console.log(this.previewUrl);
          this.successNotification()
       
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
        }
           
       }) 
       }
       successNotification() {
        Swal.fire('vos informations ont été importées avec succés !!', 'Les nutriments dejà existants n\'ont pas été ajoutés', 'success')

        window.location.reload();
        }
}
