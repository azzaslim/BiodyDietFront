import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestProductService } from 'src/app/client/Services/rest-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-supplement',
  templateUrl: './edit-supplement.component.html',
  styleUrls: ['./edit-supplement.component.css']
})
export class EditSupplementComponent implements OnInit {

  name!:string;
  portion!:string;
  composition!:string;
  comment!:string;
  CurrentProduct !: FormGroup;
  constructor(private authService: RestProductService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
  this.CurrentProduct= this._formBuilder.group({
    name: [localStorage.getItem('name')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    portion: [localStorage.getItem('portion')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    comment: [localStorage.getItem('comment')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    composition: [localStorage.getItem('composition')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    
  });

}
  async ngOnInit(): Promise<void> {
    (await this.authService.getOneProduct(JSON.parse(localStorage.getItem('product to manage')!))).subscribe(
      response => {
        console.log(response)    
            localStorage.setItem("producttoupdate",JSON.stringify(response))
            this.CurrentProduct = this._formBuilder.group({
              name: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['name']],
              portion: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['portion']],
              comment: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['comment']], 
              composition: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['composition']], 
            });
          })
}
  async updateProduct(){
    let data = this.CurrentProduct.value;
    console.log(data),
    (await this.authService.updateProduct(data))
      .subscribe(
        (      response: any) => {
          console.log(response),
          //localStorage.setItem('nutrienttoupdate',JSON.stringify(response))
          this.successNotification(),
          this.router.navigate(['/admin/nutrient/nutrientlist'])
  },
  
  
      )
  }

  
  successNotification() {
    Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
  }

}
