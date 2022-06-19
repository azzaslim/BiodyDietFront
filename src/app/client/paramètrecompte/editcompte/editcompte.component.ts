import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/loading.service';
import { RestUserService } from '../../Services/RestUser.service';

@Component({
  selector: 'app-editcompte',
  templateUrl: './editcompte.component.html',
  styleUrls: ['./editcompte.component.css']
})
export class EditcompteComponent implements OnInit {
  endDate!:string
  email!:string
  loading$ = this.loader.loading$;
  constructor(private datePipe : DatePipe,private RestUserService: RestUserService, private loader: LoadingService) { }

  async ngOnInit(): Promise<void> {
    //localStorage.removeItem('profil');
 localStorage.setItem('currentUser',JSON.stringify(await this.RestUserService.getProfile()))
 this.endDate= this.datePipe.transform(JSON.parse(localStorage.getItem('currentUser')!).endDate.date,'dd/MM/yyyy')!


  }

  changeDate(){
    this.RestUserService.renouvelleAccount(this.email).subscribe(
      Response =>
      console.log(Response)
    )
  }
  async pay(){
    this.email=(localStorage.getItem('email')!);

    localStorage.setItem('advance','oui')
    console.log(this.email)
    this.loader.show()
   await this.RestUserService.payment(this.email).subscribe(
    Response => {
      console.log(Response)
         window.location.href = Response
this.loader.hide()
    },
    err=>
    {
      console.log(err)
    });
}
}
