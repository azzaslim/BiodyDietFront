import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../Validator-Password/confirmed-validator';
import {MatTableDataSource} from '@angular/material/table';
import { RestUserService, Product } from '../Services/RestUser.service';
import { RestSymptomService } from '../Services/rest-symptom.service';
import { Symptom}  from '../Services/rest-symptom.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajouter-preparation',
  templateUrl: './ajouter-preparation.component.html',
  styleUrls: ['./ajouter-preparation.component.css']
})
export class AjouterPreparationComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['composition'];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns2 = ['symptom_name'];
  dataSource2=new MatTableDataSource<Symptom>();
  addData : FormGroup =new FormGroup({});
  constructor(private _liveAnnouncer: LiveAnnouncer,private RestUserService:RestUserService ,private router:Router, private formBuilder : FormBuilder,private user: RestUserService,private symptomservice:RestSymptomService,private authService: RestUserService ) { 

    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      portion:['',[Validators.required]],
      comment:['',[Validators.required]],
      composition:['',[Validators.required]],
    })
  }
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
  get f() {
    return this.addData.controls;
  }
add(){
  let data = this.addData.value
  
  this.RestUserService.add(data)
  .subscribe(
    response=> {
      this.router.navigate(['/preparations'])
    },
    err => console.log(err),
  )
    }

    async ngOnInit(): Promise<void> {
      this.user.getProducts().subscribe((x) =>{
        this.dataSource =new MatTableDataSource(x);
        console.log(x);
    });
    (await this.symptomservice.getSymptoms()).subscribe((x) => {
      if (x.length==0)
      {
        alert("no Symptom exist");
        this.router.navigate(['/home'])
      }
      else
    localStorage.setItem("nbsymptoms",x.length.toString());
    this.dataSource2= new MatTableDataSource(x);
    this.dataSource2.sort = this.sort;
  },
    err => {
      this.authService.logout(),
        console.log(err),
        this.failNotification();

    }
    );

   
}
}
