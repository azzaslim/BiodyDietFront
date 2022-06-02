import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from 'src/app/client/Services/rest-questionnaire.service';
import { Answer, RestResponseService } from 'src/app/client/Services/rest-response.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import { LoadingService } from 'src/app/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-answers',
  templateUrl: './list-answers.component.html',
  styleUrls: ['./list-answers.component.css']
})
export class ListAnswersComponent implements OnInit {
  id!: number;
  displayedColumns: string[] = ['id', 'name', 'ordering','Questionnaire','is_published','action'];
  actions!: string;
  souscriptionForm!: FormGroup;
  checked!: boolean;
  dataSource = new MatTableDataSource<Answer>();
  loading$ = this.loader.loading$;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestResponseService: RestResponseService,private RestUserService :RestUserService,private loader: LoadingService) {
    this.souscriptionForm = new FormGroup({
      souscription: new FormControl()
    });
  }

  @ViewChild(MatSort) sort!: MatSort;


  async ngOnInit() {
    localStorage.removeItem('C_preparation'),
    localStorage.removeItem('I_preparation'),
    localStorage.removeItem('C_suppliment'),
    localStorage.removeItem('I_suppliment'),
this.loader.show();
    (await this.RestResponseService.getAnswers()).subscribe((x) => {
      this.loader.hide()
      if (x.length == 0) {
        alert("il n\'exsite aucun questonnaire");
      }
      else
     {
        localStorage.setItem("nbQuestionnaire", x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;}

     /*  if (x[i].isPublished == true) {
        this.displayedColumns.isPublished
      } */
    },
      err => {
        this.RestUserService.logout(),
          this.failNotification();

      }
    )
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
        this.deleteQuestionnaire()
        Swal.fire('cet questionnaire a été supprimé', '', 'success')
      }
    })
  }
  async deleteQuestionnaire() {
    (await this.RestResponseService.deleteAnswer(JSON.parse(localStorage.getItem('Answer to manage')!)))
      .subscribe(
        async response => {
          this.router.navigate(['/admin/answers/Listeanswers'])
          this.ngOnInit()
        },
        err => {
          console.log(err)
        })

  }


  async AnswerToManage(answer: Answer) {
   
        localStorage.setItem('Answer to manage', JSON.stringify(answer.id))
      
       localStorage.setItem('answertoupdate', JSON.stringify(answer))

 }
  checkValue(event: any) {
  }

 
  
}