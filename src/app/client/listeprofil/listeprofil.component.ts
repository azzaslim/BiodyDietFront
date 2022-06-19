import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { RestUserService } from '../Services/RestUser.service';
import { Profil, RestPatientService } from '../Services/Rest-patient.service';
import { LoadingService } from 'src/app/loading.service';
import { HttpHeaders, HttpEventType, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-listeprofil',
  templateUrl: './listeprofil.component.html',
  styleUrls: ['./listeprofil.component.css']
})
export class ListeprofilComponent implements OnInit {
  id!: number;
  displayedColumns = ['id', 'first_name', 'last_name', 'birth_date'];
  role!: string;
  fileData!: File ;
  previewUrl!:any ;
  ImageUrl!:any ;
  
  fileUploadProgress!: string ;
  uploadedFilePath!: string;
   reader = new FileReader();      
  path!:any;
  dataSource = new MatTableDataSource<Profil>();
  loading$ = this.loader.loading$;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private user: RestPatientService, private RestUserService: RestUserService,private loader: LoadingService,private http: HttpClient) {

  }

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    localStorage.removeItem('entrepriseCheck');
    localStorage.removeItem('villeCheck');
    localStorage.removeItem('logoCkeck');
    localStorage.removeItem('nomCheck');
    localStorage.removeItem('prescriptionCheck');
    localStorage.removeItem('logoCheck');
    localStorage.removeItem('BirthDate');
    localStorage.removeItem('Birthdate');
    localStorage.removeItem('prodImpression');



this.loader.show();
localStorage.setItem("currentUser",(JSON.stringify(await this.RestUserService.getProfile())));
this.path=JSON.parse(localStorage.getItem('currentUser')!).logo;


    this.previewUrl ="assets/"+this.path;
    console.log( this.previewUrl) 
    localStorage.removeItem('profil');
this.previewUrl ="assets/"+this.path;
console.log( this.previewUrl) ;
    (await this.user.getPatients()).subscribe((x) => {
      if (x.length==0)
      {
        alert("no patient exist");

         this.role = JSON.parse(localStorage.getItem('currentUser')!).role

          if ((this.role == 'ROLE_ADMIN')||(this.role == 'ROLE_MANAGER')) {
            this.router.navigate(['/admin/home'])
          }
          else
            this.router.navigate(['/home'])      }

      else
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
this.loader.hide()
    },
      err => {
        this.RestUserService.logout(),
          console.log(err),
          this.failNotification();
        // this.showToasterError();

      }
    )
  }
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
  async GetOnePatient(id: any) {

    (await this.user.getOnePatient(this.id))
      .subscribe(
        response => {
        },
        err => console.log(err),
      )
  }
  
successNotification() {
  Swal.fire('vos informations ont été importées avec succés !!', 'Les patients dejà existants n \'ont pas été ajoutés', 'success')
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
await this.http.post('http://localhost:8000/api/importpatient',formData,{reportProgress: true,headers, observe: 'events'})
.subscribe(events => {
 if(events.type === HttpEventType.UploadProgress) {
   this.fileUploadProgress = Math.round(  100) + '%';
   this.successNotification();
   this.router.navigate(['/listeprofil']);
   console.log(this.fileUploadProgress);
   console.log(this.previewUrl);
    
 } else if(events.type === HttpEventType.Response) {
   this.fileUploadProgress = '';
 }
    
}) 
}
}