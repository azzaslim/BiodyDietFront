import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';






import Swal from 'sweetalert2';
import { RestSymptomService } from '../../../../client/Services/rest-symptom.service';

@Component({
  selector: 'app-addsymptom',
  templateUrl: './addsymptom.component.html',
  styleUrls: ['./addsymptom.component.css']
})
export class AddsymptomComponent implements OnInit {
  symptom_name!: string;
  id!:number;
  addData : FormGroup =new FormGroup({});

  constructor(public dialogRef: MatDialogRef<AddsymptomComponent>,private authService:RestSymptomService ,private router:Router, private formBuilder : FormBuilder ) { 

    this.addData=formBuilder.group({
      symptom_name:['',[Validators.required]],
    })
  }

  
  get f() {
    return this.addData.controls;
  }
  async add(){
    let data = this.addData.value;
    const name = this.addData.get('symptom_name')!.value;
    if (typeof (this.addData.get('symptom_name')!.value) !== 'string') {
  
      alert("entrez une valide unite")
    }
    

    else  {
      let data = this.addData.value;
     localStorage.removeItem('symptom_name');
    (await this.authService.addsymptom(data))

  .subscribe(
    response=> {
      this.sucessNotification()
      this.dialogRef.close();
      this.router.navigate(['/admin/symptom/symptomlist'])
    },
    err => {console.log(err),
      this.failNotification()}
  )
    }
  }
    sucessNotification() {
   
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'symptom ajouté avec succées',
        showConfirmButton: false,
        timer: 1500
      })  }
    failNotification() {
      Swal.fire({
        icon: 'info',
        title: 'symptom existe déjà !',
        text: "veuillez remplir votre questionnaire !!",
        showConfirmButton: false,
        timer: 2500
  
      })  }
  onSubmit() {
    console.log(this.addData.value);
  }
    async ngOnInit(): Promise<void> {
      if (this.authService.SymptomExist) {
        this.id = Number(localStorage.getItem('profil')!);
        (await this.authService.getOneSymptom(this.id))
          .subscribe(
            response => {
              console.log("response", response);
              localStorage.setItem('symptom_name', response[0]['symptom_name']),
              this.symptom_name = localStorage.getItem('symptom_name')!;
            
  
  
              this.addData = this.formBuilder.group({
                symptom_name: [localStorage.getItem('symptom_name')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
              });
            },
            err => console.log(err),
          )
  
      }
      this.addData = this.formBuilder.group({
        symptom_name: [localStorage.getItem('symptom_name')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      });
    }
    
}
