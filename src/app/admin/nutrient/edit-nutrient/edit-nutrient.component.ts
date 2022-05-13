import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestNutrientService } from 'src/app/client/Services/rest-nutrient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-nutrient',
  templateUrl: './edit-nutrient.component.html',
  styleUrls: ['./edit-nutrient.component.css']
})
export class EditNutrientComponent implements OnInit {
  name!:string;
  tenor!:string;
  unity!:string;
  CurrentNutrient !: FormGroup;
  constructor(private authService: RestNutrientService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
  this.CurrentNutrient= this._formBuilder.group({
    name: [localStorage.getItem('name')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    unity: [localStorage.getItem('unity')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    tenor: [localStorage.getItem('tenor')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],

  });

}
  async ngOnInit(): Promise<void> {
    (await this.authService.getNutrient(localStorage.getItem('nutrient to manage'))).subscribe(
      response => {
        console.log(response)    
            localStorage.setItem("nutrienttoupdate",JSON.stringify(response))
            this.CurrentNutrient = this._formBuilder.group({
              name: [JSON.parse(localStorage.getItem('nutrienttoupdate')!)[0]['name']],
              tenor: [JSON.parse(localStorage.getItem('nutrienttoupdate')!)[0]['tenor']],
              unity: [JSON.parse(localStorage.getItem('nutrienttoupdate')!)[0]['unity']], 
            });
          })
}
  async updateNutrient(){
    let data = this.CurrentNutrient.value;
    console.log(data),
    (await this.authService.updateNutrient(data))
      .subscribe(
        (      response: any) => {
          console.log(response),
          localStorage.setItem('nutrienttoupdate',JSON.stringify(response))
          this.successNotification(),
          this.router.navigate(['/admin/nutrient/nutrientlist'])
  },
  
  
      )
  }

  
  successNotification() {
    Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
  }
}
