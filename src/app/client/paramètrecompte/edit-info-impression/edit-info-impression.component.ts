import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpEventType, HttpHeaders,  } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RestUserService } from '../../Services/RestUser.service';


@Component({
  selector: 'app-edit-info-impression',
  templateUrl: './edit-info-impression.component.html',
  styleUrls: ['./edit-info-impression.component.css']
})
export class EditInfoImpressionComponent implements OnInit {

Nom!:string;
Prenom!:string;
CurrentUser !: FormGroup;

fileData!: File ;
previewUrl!:any ;
ImageUrl!:any ;

fileUploadProgress!: string ;
uploadedFilePath!: string;
 reader = new FileReader();      
path!:any;
  constructor(private RestUserService: RestUserService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.CurrentUser = this._formBuilder.group({
      firstName: [JSON.parse(localStorage.getItem('currentUser')!).firstName],
      lastName: [JSON.parse(localStorage.getItem('currentUser')!).lastName],
      codePostale:[JSON.parse(localStorage.getItem('currentUser')!).codePostale],
      adresse: [JSON.parse(localStorage.getItem('currentUser')!).adresse],
      entreprise: [JSON.parse(localStorage.getItem('currentUser')!).entreprise],
      country: [JSON.parse(localStorage.getItem('currentUser')!).ville],

    });

  
  }

  async ngOnInit() {
       localStorage.setItem("currentUser",(JSON.stringify(await this.RestUserService.getProfile())));
      this.path=JSON.parse(localStorage.getItem('currentUser')!).logo;

      
          this.previewUrl ="assets/"+this.path;
          console.log( this.previewUrl) 
          localStorage.removeItem('profil');


}

  async updateUser(){
  let data = this.CurrentUser.value;
  console.log(data),
  (await this.RestUserService.updateCurrentUser(data))
    .subscribe(
      (      response: any) => {
        this.successNotification()
    
    

}
    )
}

successNotification() {
  Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
}


 
fileProgress(fileInput: any) {
      this.fileData = fileInput.target.files[0];
      this.preview();
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
  formData.append('file', this.fileData);
   
  this.fileUploadProgress = '0%';
  await this.http.post('http://localhost:8000/api/updateLogo',formData,{reportProgress: true,headers, observe: 'events'})
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(  100) + '%';
      console.log(this.fileUploadProgress);
      console.log(this.previewUrl);

    } else if(events.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
    }
       
  }) 
}
}
