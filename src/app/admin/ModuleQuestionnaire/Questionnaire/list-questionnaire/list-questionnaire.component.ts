import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire, RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import {  RestUserService } from 'src/app/client/Services/RestUser.service';
import { LoadingService } from 'src/app/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-questionnaire',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.css']
})
export class ListQuestionnaireComponent implements OnInit {
  id!: number;
  displayedColumns: string[] = ['id', 'title', 'ordering','is_published','action'];
  actions!: string;
  souscriptionForm!: FormGroup;
  checked!: boolean;
  dataSource = new MatTableDataSource<Questionnaire>();
  loading$ = this.loader.loading$;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestQuestionnaireService: RestQuestionnaireService,private loader :LoadingService, private RestUserService :RestUserService) {
    this.souscriptionForm = new FormGroup({
      souscription: new FormControl()
    });
  }

  @ViewChild(MatSort) sort!: MatSort;


  async ngOnInit() {
this.getQuestionnaire()
  }
  async getQuestionnaire(){
    this.loader.show();

    (await this.RestQuestionnaireService.getQuestionnaires()).subscribe((x) => {
      this.loader.hide()

      if (x.length == 0) {
        alert("il n\'exsite aucun questonnaire");
        this.router.navigate(['/admin/home'])
      }
      else
     {
        localStorage.setItem("nbQuestionnaire", x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;}
console.log((x[0].is_published ))
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
    (await this.RestQuestionnaireService.deleteQuestionnaire(JSON.parse(localStorage.getItem('Questionnaire to manage')!)))
      .subscribe(
        async response => {
          this.router.navigate(['/admin/questionnaire/Listequestionnaire'])
          this.ngOnInit()
        },
        err => {
          console.log(err)
        })

  }


  async QuestionnaireToManage(questionnaire: Questionnaire) {
   
        localStorage.setItem('Questionnaire to manage', JSON.stringify(questionnaire.id))
        localStorage.setItem('questionnairetoupdate', JSON.stringify(questionnaire))
 }
  checkValue(event: any) {
  }

 /*  async updateUser() {
    let data = this.dataSource.data[JSON.parse(localStorage.getItem('user to manage')!)].modulePresc;
    (await this.RestUserService.updateUser(JSON.stringify({ souscription: data })))
      .subscribe(
        (response: any) => {
          localStorage.setItem('usertoupdate', JSON.stringify(response))
          this.router.navigate(['/admin/users/listeusers'])
        },


      )
  } */
  
}