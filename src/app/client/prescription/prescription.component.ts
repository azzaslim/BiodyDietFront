import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestPatientService } from '../Services/Rest-patient.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PatientsDialogComponent } from '../patients-dialog/patients-dialog.component';
import { RestQuestionnaireService } from '../Services/rest-questionnaire.service';
import { RestPrescriptionService } from '../Services/rest-prescription.service';
import { PrintService } from 'src/app/print.service';
import { RestProductService } from '../Services/rest-product.service';
import { LoadingService } from 'src/app/loading.service';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],

})

export class PrescriptionComponent implements OnInit {
  panelOpenState0 = false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  patientForm!: FormGroup;
  PrescriptionForm!: FormGroup
  selectAllItems: boolean = false;
  finalRep: Array<any> = []
  id!: number;
  nom!: string;
  prenom!: string;
  BirthDate!: Date;
  height!: number;
  weight!: number;
  profil!: string;
  IsSelected!: boolean
  elements: Array<any> = [];
  Questionnaires: Array<any> = [];
  Preparations: Array<any> = [];
  Compts: Array<any> = [];
  Complements: Array<any> = [];
  str!: string
  nomCheck!: boolean;
  logoChech!: boolean;
  adresseChech!: boolean;
  entrepriseChech!: boolean;
  prescriptionCheck !: boolean
  cIndic: Array<any> = [];

  Activities: any = ['très faible', 'faible', 'Moyenne', 'forte', 'très forte'];

  loading$ = this.loader.loading$;
  @ViewChildren('checkBox') checkBox!: QueryList<any>;
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
  constructor(private _formBuilder: FormBuilder, private router: Router, private RestProductService: RestProductService, private user: RestPatientService, private route: ActivatedRoute, private AddPatientService: RestPatientService, private datePipe: DatePipe, private dialog: MatDialog, private RestQuestionnaireService: RestQuestionnaireService, private RestPrescriptionService: RestPrescriptionService, public printService: PrintService, private loader: LoadingService) {
    this.patientForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z\s ]+")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z\s ]+")]],
      birth_date: ['', [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-]?02)[-](?:19|20)[0-9]{2}|29[-]?02[-](?:19|20)[0-9]{2})$')]],
      weight: [, Validators.required],
      height: [, Validators.required],
      gender: [, Validators.required],
      Activity: [this.Activities[0], Validators.required]


    });


  }

  async ngOnInit() {
    localStorage.removeItem('Pnom');
    localStorage.removeItem('Pprenom');
    localStorage.removeItem('BirthDate');
    localStorage.removeItem('Birthdate');
    localStorage.removeItem('height');
    localStorage.removeItem('weight');
    localStorage.removeItem('Height');
    localStorage.removeItem('Weight');
    localStorage.removeItem('gender');
    localStorage.removeItem('activity');
    localStorage.removeItem('entrepriseCheck');
    localStorage.removeItem('villeCheck');
    localStorage.removeItem('logoCkeck');
    localStorage.removeItem('nomCheck');
    localStorage.removeItem('prescriptionCheck');
    localStorage.removeItem('logoCheck');
    this.patientForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      birth_date: ['', [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[/]?(0[13-9]|1[012])|31[/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[/]?02)[/](?:19|20)[0-9]{2}|29[/]?02[/](?:19|20)[0-9]{2})$')]],
      weight: [,Validators.required],
      height: [,Validators.required],
      gender: [],
      Activity: [,Validators.required]
    });
    if (this.user.profilExist) {
      this.id = Number(localStorage.getItem('profil')!);
      (await this.user.getOnePatient(this.id))
        .subscribe(
          response => {
            console.log(response)
            localStorage.setItem('Pid', response[0]['id']),
              localStorage.setItem('Pnom', response[0]['first_name']),
              localStorage.setItem('Pprenom', response[0]['last_name']),
              localStorage.setItem('BirthDate',(this.datePipe.transform(response[0]['birth_date'],"yyyy-MM-dd")!)),
              localStorage.setItem('height', response[0]['height']),
              localStorage.setItem('weight', response[0]['weight']),
              localStorage.setItem('gender', response[0]['gender'])
            localStorage.setItem('activity', response[0]['activity'])
            this.nom = localStorage.getItem('Pnom')! + "  ";
            this.prenom = localStorage.getItem('Pprenom')!;
            this.profil = this.nom.concat(this.prenom)!;

            this.loader.show()

            this.patientForm = this._formBuilder.group({
              firstName: [localStorage.getItem('Pnom')!],
              lastName: [localStorage.getItem('Pprenom')!],
              birth_date: [(localStorage.getItem('BirthDate')!)],
              weight: [parseFloat(localStorage.getItem('weight')!)],
              height: [parseFloat(localStorage.getItem('height')!)],
              gender: [localStorage.getItem('gender')!],
              Activity: [localStorage.getItem('activity')!]

            });
            this.loader.hide()
          },
          err => console.log(err),
        )

    }
    // [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]
    //, [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]


    this.Questionnaire()

    this.Prescription()

  }
  async Questionnaire() {
    this.loader.show();

    (await this.RestQuestionnaireService.getQuestionnaires()).subscribe((x) => {
      for (var i = 0; i < x.length; i++) {
        if (x[i]['is_published'] === true)
          this.Questionnaires.push(x[i])
      }
      this.Questionnaires.forEach(async elm => {
        (await this.RestPrescriptionService.getAnswersByQuest(elm.id)).subscribe((x) => {
          let test = {};
          test = ({ 'id': elm.title, 'answers': x })
          //console.log(test)
          this.elements.push(test);
        })

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



  async openDialog(): Promise<void> {
    this.loader.show();

    (await this.user.getPatients()).subscribe((x) => {
      // this.dataSource = new MatTableDataSource(x);
      if (x.length == 0) {
        // this.onNoClick()
        alert('no patient exist')
      }
      else {
        const dialogRef = this.dialog.open(PatientsDialogComponent, {
          width: '50%',
          height: '55%',
          data: {},
        });
        this.loader.hide();

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    },

    )

  }
  get f() {
    return this.patientForm.controls;
  }

  async AddPatient() {
    let data = this.patientForm.value;
    console.log(data)
    localStorage.setItem('newPatient', JSON.stringify(data))
    localStorage.setItem('Pnom', data['firstName']),
    localStorage.setItem('Pprenom', data['lastName']),
   localStorage.setItem('Birthdate',this.datePipe.transform(data['birth_date'],"dd-MM-yyyy")!),
    localStorage.setItem('Height',data['height']),
    localStorage.setItem('Weight', data['weight']),
    localStorage.setItem('gender', data['gender'])
  localStorage.setItem('activity',data['Activity']) 
  this.nom = localStorage.getItem('Pnom')! + "  ";
  this.prenom = localStorage.getItem('Pprenom')!;
  this.profil = this.nom.concat(this.prenom)!;
    const prasedDate = Date.parse(this.patientForm.get('birth_date')!.value)
    if (isNaN(prasedDate) || this.patientForm.get('birth_date')!.value.length < 10) {
    }
    if ((typeof (this.patientForm.get('firstName')!.value) !== 'string')) {

      alert("entrez un valide nom")
    }
    if ((typeof (this.patientForm.get('weight')!.value) === null) || (typeof (this.patientForm.get('height')!.value) === null)) {

      alert("entrez un valide poids ou taille")
    }

    else {
      (await this.AddPatientService.AddPatient(data))
        .subscribe(
          response => {
            this.sucessNotification()

          },
          err => {
            console.log(err)
            this.failNotification()
          }
        )
      //this.patientForm.reset()
      localStorage.removeItem('nom')
      localStorage.removeItem('prenom')
      localStorage.removeItem('height')
      localStorage.removeItem('weight')
      localStorage.removeItem('BirthDate')
    }
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

    this.printService.printDocument('prescription', invoiceIds);
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
  changeActivity(e: any) {
    this.Activity?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get Activity() {
    return this.patientForm.get('Activity');
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
    let id = localStorage.getItem('Pid')

    this.Complements.forEach(el => {
      if (el['checked'] == true) {
        this.ProdImpression.push({ 'prod': el['name'], 'comment': el['comment'] })

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
}