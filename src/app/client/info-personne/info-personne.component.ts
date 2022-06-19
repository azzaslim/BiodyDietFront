import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/loading.service';
import { PrintService } from 'src/app/print.service';
import Swal from 'sweetalert2';
import { AnalysesService } from '../Services/analyses.service';
import { RestPatientService, Profil } from '../Services/Rest-patient.service';
import { RestPrescriptionService } from '../Services/rest-prescription.service';
import { RestProductService } from '../Services/rest-product.service';
import { RestQuestionnaireService } from '../Services/rest-questionnaire.service';
import { RestUserService } from '../Services/RestUser.service';

@Component({
  selector: 'app-info-personne',
  templateUrl: './info-personne.component.html',
  styleUrls: ['./info-personne.component.css']
})
export class InfoPersonneComponent implements OnInit {

  title = ["nouvelle prescription", "Questionnaire", "Prescriptions compléments", "impression"];
  panelOpenState0 = false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  id!: number;
  nom!: string;
  prenom!: string;
  profil!: string;
  Questionnaires: Array<any> = [];
  Preparations: Array<any> = [];
  Compts: Array<any> = [];
  Complements: Array<any> = [];
  elements: Array<any> = [];
  IsSelected!: boolean

  str!: string
  nomCheck!: boolean;
  logoChech!: boolean;
  adresseChech!: boolean;
  entrepriseChech!: boolean;
  prescriptionCheck !: boolean
  cIndic: Array<any> = [];
  products: Array<any> = []
  prods: Array<any> = []

  answers: Array<any> = []
  questions: Array<any> = []
  mfinal: Array<any> = []
  ProdImpression: Array<any> = []
  Products: Array<any> = []
  ProductsEnabled: Array<any> = []

  myModel = true;
  checkedvalue!: boolean;
  check!: boolean
  DernierePresc!: string
  loading$ = this.loader.loading$;

  constructor(private analysesService: AnalysesService, private _formBuilder: FormBuilder, private router: Router, private RestProductService: RestProductService, private user: RestPatientService, private route: ActivatedRoute, private AddPatientService: RestPatientService, private datePipe: DatePipe, private dialog: MatDialog, private RestQuestionnaireService: RestQuestionnaireService, private RestPrescriptionService: RestPrescriptionService, public printService: PrintService, private loader: LoadingService) {

  }
  //Validators.required
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      secondCtrl: [''],
      thirdCtrl: [''],
      fourthCtrl: [''],
      fivthCtrl: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.id = this.route.snapshot.params['id'];
    this.GetOnePatient();
    this.Questionnaire()

    this.Prescription()
    this.GetPrescription()

  }


  async Questionnaire() {
    this.loader.show();

    (await this.RestQuestionnaireService.getQuestionnaires()).subscribe(async (x) => {
      for (var i = 0; i < x.length; i++) {
        if (x[i]['is_published'] === true)
          this.Questionnaires.push(x[i])
      }
      this.Questionnaires.forEach(async (elm) => {
        (await this.RestPrescriptionService.getAnswersByQuest(elm.id)).subscribe(async (x) => {
          var test = {};
          test = { 'id': elm.title, 'answers': x };
          //console.log(test)
          this.elements.push(test);
          (await this.analysesService.GetPrescription(this.id)).subscribe((x) => {
            if (x[0].prescriptions.length != 0) {
              // console.log('Questionnaire', typeof (this.Preparations))
              x[0].prescriptions[0].choices.forEach((elm: { answers: { name: any; }; name: any; }): void => {


                // console.log(x[0].prescriptions[0].choices);
                this.elements.forEach(prep => {
                  prep.answers.forEach((ans: any): void => {
                    if (elm.answers.name == ans.name) {
                      //console.log('aaaaaaaaaaaaaaaaaaa', ans);
                      ans.checked = true;

                    }

                  });

                });
              });

            }
          });
          //console.log(this.elements)

        });
      })
      this.loader.hide()

    })

  }
  async Prescription() {

    (await this.RestProductService.getProducts()).subscribe((x) => {

      for (var i = 0; i < x.length; i++) {
        //console.log((x[i]))

        // console.log(x[i])
        if (x[i]['type'] === 'preparation')
          this.Preparations.push({
            'checked': false,
            'value': x[i]['name'],
            'id': x[i]['id'],
            'comment': x[i]['comment'],
            'name': x[i]['name']


          })
        if (x[i]['type'] === 'complement') {
          this.Complements.push({
            'checked': false,
            'value': x[i]['name'],
            id: x[i]['id'],
            'comment': x[i]['comment'],
            'name': x[i]['name']


          })
        }

      }


    })

  }



  public onStepChange(event: any): void {
  }
  async GetPrescription() {

    (await this.analysesService.GetPrescription(this.id)).subscribe((x) => {
      if (x[0].prescriptions.length != 0) {
        this.DernierePresc = this.datePipe.transform(x[0].prescriptions[0]['created_at'], 'yyyy-MM-dd')!
        x[0].prescriptions[0].product.forEach((elm: { name: any; }) => {
          this.Preparations.forEach(prep => {
            if (elm.name == prep.value) {
              prep.checked = true
              this.ProductsEnabled.push(prep.id)
              this.ProdImpression.push({ 'prod': prep['value'], 'comment': prep['comment'] })
            }
          })
          this.Complements.forEach(prep => {
            if (elm.name == prep.value) {
              prep.checked = true
              this.ProductsEnabled.push(prep.id)
              this.ProdImpression.push({ 'prod': prep['value'], 'comment': prep['comment'] })

            }
          })
        })
        x[0].prescriptions[0].choices.forEach((elm: { name: any; }) => {
          this.elements.forEach(prep => {
            if (elm.name == prep.title) {
              prep.checked = true
            }
          })
        })
        console.log(this.ProdImpression)
        localStorage.setItem('prodImpression', JSON.stringify(this.ProdImpression))
      }
      else (this.DernierePresc = "Aucune dernière prescription")
    },
      err => console.log(err),
    )
    
  }

  async GetOnePatient() {
    localStorage.setItem('profil', JSON.stringify(this.id));
    (await this.user.getOnePatient(this.id))
      .subscribe(
        response => {
          console.log(response[0])
          localStorage.setItem('nom', response[0]['first_name']),
            localStorage.setItem('prenom', response[0]['last_name'])
          localStorage.setItem('Height', response[0]['height'])
          localStorage.setItem('Weight', response[0]['weight'])

          localStorage.setItem('BirthDate', ((this.datePipe.transform(response[0]['birth_date'], "dd,MM,yyyy")!)))

          this.nom = localStorage.getItem('nom')! + "  ";
          this.prenom = localStorage.getItem('prenom')!
          this.profil = this.nom.concat(this.prenom)!
        },
        err => console.log(err),
      )
  }
  showOptions(event: MatCheckboxChange): void {

    if (event.checked == true) {

      this.Compts = []
      this.products = []
      this.Compts.push({ 'name': event.source.value, checked: event.checked });
      console.log(this.Compts[0].name)
      let m: {} = {}
      if (this.mfinal.length !== 0) {
        this.mfinal.forEach(elm => {
          this.Compts[0].name.answers_products.forEach((prod: any) => {
            if (elm['reponse'] === this.Compts[0].name.name) {
              elm.product.push({ 'name': prod.product.name, 'indication': prod.indication })
            }
            else {
              console.log(prod.product.id)
              this.products.push({ 'name': prod.product.id, 'indication': prod.indication })
              if ((prod.indication === true) && (this.ProductsEnabled.includes(prod.product.id) == false) && (this.cIndic.includes(prod.product.id) == false)) {
                this.ProductsEnabled.push(prod.product.id)
              }
              /*      if ((prod.indication === false) &&(this.cIndic.includes(prod.product.name) == false)) {
                     if ((this.ProductsEnabled.includes(prod.product.name) == true)) {
                       this.ProductsEnabled.splice(index, 1)
                     }
                     
                     this.cIndic.push(prod.product.name)
                   } */
              this.ProductsEnabled.forEach((penabled, index) => {

                if ((prod.indication === false) && (this.cIndic.includes(prod.product.id) == false) && (penabled == prod.product.id)) {
                  this.cIndic.push(prod.product.id)

                  if ((this.ProductsEnabled.includes(prod.product.id) == true)) {
                    this.ProductsEnabled.splice(index, 1)
                  }
                  this.Preparations.forEach(prepar => {
                    if ((prepar.value == prod.product.id) && (prepar.checked == true)) {
                      prepar.checked = false
                    }
                  })
                  this.Complements.forEach(prepar => {
                    if ((prepar.value == prod.product.id) && (prepar.checked == true)) {
                      prepar.checked = false
                    }

                  })


                }
              })
              if ((prod.indication === false) && (this.cIndic.includes(prod.product.id) == false))
                this.cIndic.push(prod.product.id)
              m = ({ 'reponse': this.Compts[0].name.name, 'question': this.Compts[0].name.questionnaire.title, 'product': this.products })
              this.ProductsEnabled.forEach((pe, index) => {
                this.Preparations.forEach(prep => {
                  // console.log( (this.cIndic.includes(prep)== false))
                  if (this.cIndic.includes(prep) == false)
                    if ((pe === prep.id)) {
                      prep.checked = true
                    }
                  if (this.cIndic.includes(prep) == true) {
                    prep.checked = false
                    this.ProductsEnabled.splice(index, 1)
                  }
                });
                this.Complements.forEach(comp => {
                  if (this.cIndic.includes(comp) == false) {
                    if ((pe.id === comp.id)) {
                      comp.checked = true
                    }
                  }
                  if (this.cIndic.includes(comp) == true) {
                    comp.checked = false
                    this.ProductsEnabled.splice(index, 1)
                  }
                });
              })

            }


          })
        })
      }
      else {
        this.Compts[0].name.answers_products.forEach((prod: any) => {
          console.log(prod)
          this.products.push({ 'name': prod.product.id, 'indication': prod.indication })
          if (prod.indication == true) {
            this.ProductsEnabled.push(prod.product.id)
            //  console.log(prod.product.id)
          } else this.cIndic.push(prod.product.id)
          this.ProductsEnabled.forEach((pe) => {
            this.Preparations.forEach(prep => {
              if ((pe === prep.id)) {

                prep.checked = true
              }

            });
            this.Complements.forEach(comp => {
              if ((pe === comp.id)) {

                comp.checked = true
              }

            });

          })
          m = ({ 'reponse': this.Compts[0].name.name, 'question': this.Compts[0].name.questionnaire.title, 'product': this.products })
        })
      }
      if (Object.values(m).length !== 0) { this.mfinal.push(m) }

      this.ProductsEnabled.forEach((prod: any) => {
        this.Preparations.forEach(prep => {
          if ((prep.id === prod)) {

            prep.checked = true
          }
        });
        this.Complements.forEach(comp => {
          if (comp.id === prod) {
            comp.checked = true
          }
        })
      })



    }
    if (event.checked == false) {
      console.log(this.Preparations)

      this.Compts = []
      this.Compts.push({ 'name': event.source.value, checked: event.checked });
      console.log(this.Compts)

      this.Compts[0].name.answers_products.forEach((prod: any) => {
        this.cIndic.forEach((pe, index) => {

          if ((prod.product.id == pe.id)) {
            this.cIndic.splice(index, 1);
          }
        })



        //this.ProductsEnabled.splice(this.ProductsEnabled.lastIndexOf(index), 1)
        //this.ProductsEnabled.splice((index), 1)
        this.ProductsEnabled = []
        this.cIndic = []


        this.Preparations.forEach(prep => {
          this.ProductsEnabled.forEach((pe, index) => {

            if (this.cIndic.includes(prep) == true) {
              this.ProductsEnabled.splice(index, 1)
            }
          })
          if ((prep.id == prod.product.id)) {
            prep.checked = false
          }
        })
        this.Complements.forEach(com => {
          if ((com.id === prod.product.id)) {
            com.checked = false
          }
        })
        this.mfinal.forEach((element, index) => {
          if (element.reponse == this.Compts[0].name.name)
            this.mfinal.splice(index, 1);
        });



      })

      if (this.mfinal.length !== 0) {
        this.mfinal.forEach((element) => {

          console.log('not vide')
          element.product.forEach((ep: { indication: boolean; name: any; }) => {
            //  console.log(ep)
            // console.log(ep.name)
            if ((ep.indication === true) && (this.ProductsEnabled.includes(ep.name) == false)) {
              this.ProductsEnabled.push(ep.name);
            }
            if ((ep.indication === false) && (this.cIndic.includes(ep.name) == false)) {
              this.cIndic.push(ep.name);
              this.ProductsEnabled.forEach((pe, index) => {
                if (pe == ep.name) {
                  this.ProductsEnabled.splice(index, 1)
                }
              })
            }
          })
        })
        console.log(this.ProductsEnabled)
        this.ProductsEnabled.forEach((pe, index) => {
          this.Preparations.forEach(prep => {
            console.log(prep.id)
            if ((prep.value === pe)) {
              prep.checked = true
            }
          })
          this.Complements.forEach(prep => {
            if ((prep.id === pe)) {
              prep.checked = true
            }
          })
        })
      }
      this.Complements.forEach(com => {
        if (com.checked == true) {
          this.ProductsEnabled.push(com.id)
        }
      })
      this.Preparations.forEach(com => {
        if (com.checked == true) {
          this.ProductsEnabled.push(com.id)
        }
      })
      console.log('vide')
      console.log("PE", this.ProductsEnabled)
      console.log("CI", this.cIndic)
      console.log('mfinal', this.mfinal)
    }


    console.log("PE", this.ProductsEnabled)
    console.log("CI", this.cIndic)
    console.log('mfinal', this.mfinal)



  }

  showOptionsProducts(event: MatCheckboxChange): void {
    if (event.checked == true) {
      this.prods = []
      this.prods.push({ 'prod': event.source.value });

      console.log(this.prods[0])
      if ((this.ProductsEnabled.length != 0) && (this.ProductsEnabled.includes(this.prods[0].prod) == false)) {
        {
          this.ProductsEnabled.push(this.prods[0].prod.id)
        }
      }
      if (this.ProductsEnabled.length == 0) {
        this.ProductsEnabled.push(this.prods[0].prod.id)
      }

    }
    if (event.checked == false) {
      this.prods = []
      this.prods.push({ 'prod': event.source.value });

      console.log(this.prods[0])
      if (this.ProductsEnabled.length != 0) {
        this.ProductsEnabled.forEach((pe, index) => {
          if (pe == this.prods[0].prod.id) {
            this.ProductsEnabled.splice(index, 1)
          }
        })
      }
    }

    console.log("PE", this.ProductsEnabled)
    console.log("CI", this.cIndic)

  }
  async SavePrescription() {
    console.log(this.Preparations)
    console.log(this.Complements)
    let id = localStorage.getItem('Pid')

    this.Complements.forEach(el => {
      if (el['checked'] == true) {
        this.ProdImpression.push({ 'prod': el['name'], 'comment': el['comment'] })
        console.log(this.ProdImpression)
        localStorage.setItem('prodImpression', JSON.stringify(this.ProdImpression))
        this.Products.push(el['id'])
      }
      this.mfinal.forEach(answ => {
        if (this.answers.includes(answ.reponse) == false)
          this.answers.push(answ.reponse)
        if (this.questions.includes(answ.question) == false)
          this.questions.push(answ.question)

      }
      )

    })
    this.Preparations.forEach(prep => {
      if (prep['checked'] == true) {
        this.Products.push(prep['id'])
        this.ProdImpression.push({ 'prod': prep['name'], 'comment': prep['comment'] })
        console.log(this.ProdImpression)
        localStorage.setItem('prodImpression', JSON.stringify(this.ProdImpression))

      }


      this.mfinal.forEach(answ => {
        if (this.answers.includes(answ.reponse) == false)
          this.answers.push(answ.reponse)
        if (this.questions.includes(answ.question) == false)
          this.questions.push(answ.question)
      })
    })
    console.log(this.ProdImpression)
    localStorage.setItem('prodImpression', JSON.stringify(this.ProdImpression))
    let data = JSON.stringify({ 'patient_id': id, 'Products': this.Products, 'Answers': this.answers, 'question': this.questions })
    console.log(data);
    (await (this.RestPrescriptionService.AddPrescription(data)))
      .subscribe(
        response => {
          console.log(response)
          this.AddPrescsucessNotification()
        },
        err => { console.log(err) },
      )
  }
  sucessNotification() {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Patient ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })
  }
  AddPrescsucessNotification() {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'votre prescription est ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })
  }
  failNotification() {
    Swal.fire({
      icon: 'info',
      title: 'Patient existe déjà !',
      text: "veuillez remplir votre questionnaire !!",
      showConfirmButton: false,
      timer: 2500

    })
  }

  onPrintInvoice() {

    const invoiceIds = ['1'];

    this.printService
      .printDocument('prescription', invoiceIds);
    this.loader.show()

  }
  onChangeNom(ob: MatCheckboxChange) {
    localStorage.setItem('nomCheck', JSON.stringify(ob.checked))
  }
  onChangeLogo(ob: MatCheckboxChange) {
    localStorage.setItem('logoCheck', JSON.stringify(ob.checked))
  }
  onChangePrescription(ob: MatCheckboxChange) {
    localStorage.setItem('prescriptionCheck', JSON.stringify(ob.checked))
  }

  onChangeVille(ob: MatCheckboxChange) {
    localStorage.setItem('villeCheck', JSON.stringify(ob.checked))
  }
  onChangeEntreprise(ob: MatCheckboxChange) {
    localStorage.setItem('entrepriseCheck', JSON.stringify(ob.checked))
  }
  onChangeAll(ob: MatCheckboxChange) {
    localStorage.setItem('entrepriseCheck', JSON.stringify(ob.checked))
    localStorage.setItem('villeCheck', JSON.stringify(ob.checked))
    localStorage.setItem('logoCheck', JSON.stringify(ob.checked))
    localStorage.setItem('nomCheck', JSON.stringify(ob.checked))
    this.onChangeNom(ob);
    this.onChangeLogo(ob);
    this.onChangeVille(ob);
    this.onChangeEntreprise(ob);
    this.IsSelected = ob.checked;
  }
}