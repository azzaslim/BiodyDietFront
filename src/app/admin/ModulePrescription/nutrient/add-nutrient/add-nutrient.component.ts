import { RestNutrientService } from '../../../../client/Services/rest-nutrient.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-nutrient',
  templateUrl: './add-nutrient.component.html',
  styleUrls: ['./add-nutrient.component.css']
})
export class AddNutrientComponent implements OnInit {
  id!: number;
  name!: string;
  tenor!: string;
  unity!: string;
  addData : FormGroup =new FormGroup({});

  constructor(public dialogRef: MatDialogRef<AddNutrientComponent>,private authService:RestNutrientService ,private router:Router, private formBuilder : FormBuilder,private user: RestNutrientService ) { 


    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      tenor:['',[Validators.required]],
      unity:['',[Validators.required ]],
    })
  }
  get f() {
    return this.addData.controls;
  }
   async add(){

      let data = this.addData.value;
      const name = this.addData.get('name')!.value;
  
     
      const unity = this.addData.get('unity')!.value;
      if (typeof (this.addData.get('unity')!.value) !== 'string') {
  
        alert("entrez une valide unite")
      }
      
  
      else  {
        let data = this.addData.value;
    
        (await this.authService.addNutrient(data))
        .subscribe(
          response=> {
            this.sucessNotification();
            this.router.navigate(['/admin/nutrient/nutrientlist'])
            this.dialogRef.close();
          },

         
          err => {console.log(err),
            this.failNotification()}
        )
          }
         
        
        //this.addData.reset()
        localStorage.removeItem('name')
        localStorage.removeItem('tenor')
        localStorage.removeItem('unity')
        
      }
    
      sucessNotification() {
   
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'nutriment ajouté avec succées',
          showConfirmButton: false,
          timer: 1500
        })  }
      failNotification() {
        Swal.fire({
          icon: 'info',
          title: 'nutriment existe déjà !',
          text: "veuillez remplir votre questionnaire !!",
          showConfirmButton: false,
          timer: 2500
    
        })  }
    onSubmit() {
      console.log(this.addData.value);
    }
  async ngOnInit(): Promise<void> {
    if (this.user.NutrientExist) {
      this.id = Number(localStorage.getItem('profil')!);
      (await this.user.getOneNutrient(this.id))
        .subscribe(
          response => {
            console.log("response", response);
            localStorage.setItem('name', response[0]['name']),
              localStorage.setItem('tenor', response[0]['tenor']),
              localStorage.setItem('unity', response[0]['unity']),

            this.name = localStorage.getItem('nom')!;
            this.tenor = localStorage.getItem('prenom')!;
            this.unity = localStorage.getItem('unity')!;


            this.addData = this.formBuilder.group({
              name: [localStorage.getItem('name')!, [Validators.required]],
              unity: [localStorage.getItem('unity')!, [Validators.required]],
              tenor: [localStorage.getItem('tenor')!, [Validators.required]],
            });
          },
          err => console.log(err),
        )

    }
    this.addData = this.formBuilder.group({
      name: [localStorage.getItem('name')!, [Validators.required]],
      tenor: [localStorage.getItem('tenor')!, [Validators.required]],
      unity: [localStorage.getItem('unity')!, [Validators.required]],
    });
  }
}
