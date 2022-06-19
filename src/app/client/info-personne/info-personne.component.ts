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
  styleUrls: ['./info-personne.component.css'],
})
export class InfoPersonneComponent implements OnInit {
  title = [
    'nouvelle prescription',
    'Questionnaire',
    'Prescriptions compléments',
    'impression',
  ];
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
  IsSelected!: boolean;
click=true;
  str!: string;
  nomCheck!: boolean;
  logoChech!: boolean;
  adresseChech!: boolean;
  entrepriseChech!: boolean;
  prescriptionCheck!: boolean;
  cIndic: Array<any> = [];
  products: Array<any> = [];
  prods: Array<any> = [];

  answers: Array<any> = [];
  questions: Array<any> = [];
  mfinal: Array<any> = [];
  ProdImpression: Array<any> = [];
  Products: Array<any> = [];
  ProductsEnabled: Array<any> = [];

  myModel = true;
  checkedvalue!: boolean;
  check!: boolean;
  DernierePresc!: string;
  loading$ = this.loader.loading$;

  constructor(
    private analysesService: AnalysesService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private RestProductService: RestProductService,
    private user: RestPatientService,
    private route: ActivatedRoute,
    private AddPatientService: RestPatientService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private RestQuestionnaireService: RestQuestionnaireService,
    private RestPrescriptionService: RestPrescriptionService,
    public printService: PrintService,
    private loader: LoadingService
  ) {}
  //Validators.required
  ngOnInit() {
    
    localStorage.removeItem('prodImpression')
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
    this.Questionnaire();

    this.Prescription();
    this.GetPrescription();
  }

  async Questionnaire() {
    this.loader.show();

    (await this.RestQuestionnaireService.getQuestionnaires()).subscribe(
      async (x) => {
        for (var i = 0; i < x.length; i++) {
          if (x[i]['is_published'] === true) this.Questionnaires.push(x[i]);
        }
        this.Questionnaires.forEach(async (elm) => {
          (
            await this.RestPrescriptionService.getAnswersByQuest(elm.id)
          ).subscribe(async (x) => {
            var test = {};
            test = { id: elm.title, answers: x };
            //console.log(test)
            this.elements.push(test);

            (await this.analysesService.GetPrescription(this.id)).subscribe(
              (x) => {
                if (x[0].prescriptions.length != 0) {
                  // console.log('Questionnaire', typeof (this.Preparations))
                  x[0].prescriptions[0].choices.forEach(
                    (elm: { answers: { name: any }; name: any }): void => {
                      // console.log(x[0].prescriptions[0].choices);
                      this.elements.forEach((prep) => {
                        prep.answers.forEach((ans: any): void => {
                          let m: {} = {};

                          if (elm.answers.name == ans.name) {
                            console.log('aaaaaaaaaaaaaaaaaaa', ans);
                            ans.checked = true;
                            console.log(ans);
                            ans.answers_products.forEach((prod: any) => {
                              console.log(prod);
                              this.products.push({
                                name: prod.product.id,
                                indication: prod.indication,
                              });
                              if (prod.indication == true) {
                                if (
                                  this.ProductsEnabled.includes(
                                    prod.product.id == false
                                  )
                                ) {
                                  this.ProductsEnabled.push(prod.product.id);
                                } //  console.log(prod.product.id)
                              } else {
                                if (this.cIndic.includes(prod.product.id )== false)
                                  this.cIndic.push(prod.product.id);
                                console.log('checkkkkk');
                              }
                              this.ProductsEnabled.forEach((pe) => {
                                this.Preparations.forEach((prep) => {
                                  if (pe === prep.id) {
                                    prep.checked = true;
                                  }
                                });
                                this.Complements.forEach((comp) => {
                                  if (pe === comp.id) {
                                    comp.checked = true;
                                  }
                                });
                              });
                              let s=[]
                              for (var i=0;i< ans.answers_products.length;i++)
                                { 
                                  s.push(ans.answers_products[i])
                                }
                              m = { reponse: ans.name, question: ans.questionnaire.title, product: s
                                
                              };
                              
                            });
                          }
                          if (Object.values(m).length !== 0) {
                            this.mfinal.push(m);
                          }
                        });
                        console.log(this.mfinal);
                        console.log(this.ProductsEnabled);
                        console.log(this.cIndic);
                      });
                    }
                  );
                }
              }
            );
            //console.log(this.elements)
          });
        });
        this.loader.hide();
      }
    );
  }
  async Prescription() {
    (await this.RestProductService.getProducts()).subscribe((x) => {
      for (var i = 0; i < x.length; i++) {
        //console.log((x[i]))

        // console.log(x[i])
        if (x[i]['type'] === 'preparation')
          this.Preparations.push({
            checked: false,
            value: x[i]['name'],
            id: x[i]['id'],
            comment: x[i]['comment'],
            name: x[i]['name'],
          });
        if (x[i]['type'] === 'complement') {
          this.Complements.push({
            checked: false,
            value: x[i]['name'],
            id: x[i]['id'],
            comment: x[i]['comment'],
            name: x[i]['name'],
          });
        }
      }
    });
  }

  public onStepChange(event: any): void {}
  async GetPrescription() {
    (await this.analysesService.GetPrescription(this.id)).subscribe(
      (x) => {
        if (x[0].prescriptions.length != 0) {
          this.DernierePresc = this.datePipe.transform(
            x[0].prescriptions[0]['created_at'],
            'yyyy-MM-dd'
          )!;
          x[0].prescriptions[0].product.forEach((elm: { name: any }) => {
            this.Preparations.forEach((prep) => {
              if (elm.name == prep.value) {
                prep.checked = true;
                this.ProductsEnabled.push(prep.id);
                if ((this.Products.includes(prep['id'])==false)) {
                  this.Products.push(prep['id']);
          
                this.ProdImpression.push({
                  prod: prep['value'],
                  comment: prep['comment'],
                });
              }}
            });
            this.Complements.forEach((prep) => {
              if (elm.name == prep.value) {
                prep.checked = true;
                this.ProductsEnabled.push(prep.id);
                if ((this.Products.includes(prep['id'])==false)) {
                  this.Products.push(prep['id']);
          
                this.ProdImpression.push({
                  prod: prep['value'],
                  comment: prep['comment'],
                });
              }
              }
            });
          });
          x[0].prescriptions[0].choices.forEach((elm: { name: any }) => {
            this.elements.forEach((prep) => {
              if (elm.name == prep.title) {
                prep.checked = true;
              }
            });
          });
          console.log(this.ProdImpression);
          localStorage.setItem(
            'prodImpression',
            JSON.stringify(this.ProdImpression)
          );
        } else this.DernierePresc = 'Aucune dernière prescription';
      },
      (err) => console.log(err)
    );
  }

  async GetOnePatient() {
    localStorage.setItem('profil', this.id.toString());
    (await this.user.getOnePatient(this.id)).subscribe(
      (response) => {
        console.log(response[0]);
        localStorage.setItem('nom', response[0]['first_name']),
          localStorage.setItem('prenom', response[0]['last_name']);
        localStorage.setItem('Height', response[0]['height']);
        localStorage.setItem('Weight', response[0]['weight']);

        localStorage.setItem('BirthDate', response[0]['birth_date']!);

        this.nom = localStorage.getItem('nom')! + '  ';
        this.prenom = localStorage.getItem('prenom')!;
        this.profil = this.nom.concat(this.prenom)!;
      },
      (err) => console.log(err)
    );
  }
  showOptions(event: MatCheckboxChange): void {
    if (event.checked == true) {
      this.click=false;
      this.Compts = [];
      this.products = [];
      this.Compts.push({ name: event.source.value, checked: event.checked });
      console.log(this.Compts[0].name);
      let m: {} = {};
      if (this.mfinal.length !== 0) {
        this.mfinal.forEach((elm) => {
          this.Compts[0].name.answers_products.forEach((prod: any) => {
            if (elm['reponse'] === this.Compts[0].name.name) {
              elm.product.push({
                name: prod.product.name,
                indication: prod.indication,
              });
            } else {
              console.log(prod.product.id);
              this.products.push({
                name: prod.product.id,
                indication: prod.indication,
              });
              if (
                prod.indication === true &&
                this.ProductsEnabled.includes(prod.product.id) == false &&
                this.cIndic.includes(prod.product.id) == false
              ) {
                this.ProductsEnabled.push(prod.product.id);
              }
              this.ProductsEnabled.forEach((penabled, index) => {
                if (
                  (prod.indication === false) &&
                 ( this.cIndic.includes(prod.product.id) == false) &&
                 ( penabled == prod.product.id)
                ) {
                  this.cIndic.push(prod.product.id);
                  if (this.ProductsEnabled.includes(prod.product.id) == true) {
                    this.ProductsEnabled.splice(index, 1);
                  }
                  this.Preparations.forEach((prepar) => {
                    if (
                      prepar.id == prod.product.id &&
                      prepar.checked == true
                    ) {
                      prepar.checked = false;
                    }
                  });
                  this.Complements.forEach((prepar) => {
                    if (
                      prepar.id == prod.product.id &&
                      prepar.checked == true
                    ) {
                      prepar.checked = false;
                    }
                  });
                }
              });
              if (
                prod.indication === false &&
                this.cIndic.includes(prod.product.id) == false
              ) {
                this.cIndic.push(prod.product.id);
                console.log('checkkkkk');
              }
                let s=[]
              for (var i=0;i< this.Compts[0].name.answers_products.length;i++)
              { 
                s.push(this.Compts[0].name.answers_products[i])
              }
            
              m = {
                reponse: this.Compts[0].name.name,
                question: this.Compts[0].name.questionnaire.title,
                product: s,
              };
              this.ProductsEnabled.forEach((pe, index) => {
                this.Preparations.forEach((prep) => {
                  // console.log( (this.cIndic.includes(prep)== false))
                  if (this.cIndic.includes(prep) == false)
                    if (pe === prep.id) {
                      prep.checked = true;
                    }
                  if (this.cIndic.includes(prep) == true) {
                    prep.checked = false;
                    this.ProductsEnabled.splice(index, 1);
                  }
                });
                this.Complements.forEach((comp) => {
                  if (this.cIndic.includes(comp) == false) {
                    if (pe.id === comp.id) {
                      comp.checked = true;
                    }
                  }
                  if (this.cIndic.includes(comp) == true) {
                    comp.checked = false;
                    this.ProductsEnabled.splice(index, 1);
                  }
                });
              });
            }
          });
        });
      } else {
        this.Compts[0].name.answers_products.forEach((prod: any) => {
          console.log(prod);
          this.products.push({  name: prod.product.id, indication: prod.indication});
          if (prod.indication == true) {
            
              this.ProductsEnabled.push(prod.product.id);
            //  console.log(prod.product.id)
          } else {
         
              this.cIndic.push(prod.product.id);
            
            console.log('checkkkkk');
          }
          this.ProductsEnabled.forEach((pe) => {
            this.Preparations.forEach((prep) => {
              if (pe === prep.id) {
                prep.checked = true;
              }
            });
            this.Complements.forEach((comp) => {
              if (pe === comp.id) {
                comp.checked = true;
              }
            });
          });
          m = {
            reponse: this.Compts[0].name.name,
            question: this.Compts[0].name.questionnaire.title,
            product: this.products,
          };
        });
      }
      if (Object.values(m).length !== 0) {
        this.mfinal.push(m);
      }

      this.ProductsEnabled.forEach((prod: any) => {
        this.Preparations.forEach((prep) => {
          if (prep.id === prod) {
            prep.checked = true;
          }
        });
        this.Complements.forEach((comp) => {
          if (comp.id === prod) {
            comp.checked = true;
          }
        });
        this.cIndic.forEach((x,index)=>{
          if (x==prod){
            this.ProductsEnabled.splice(index,1)
            this.Preparations.forEach((prep) => {
              if (prep.id === prod) {
                prep.checked = false;
              }
            });
            this.Complements.forEach((comp) => {
              if (comp.id === prod) {
                comp.checked = false;
              }
            });
          }
        })
      });
      
    }
    if (event.checked == false) {
      this.click=false;
      //console.log(this.Preparations);
      this.Compts = [];
      this.Compts.push({ name: event.source.value, checked: event.checked });
      console.log(this.Compts);
      this.mfinal.forEach((element, index) => {
        if (element.reponse == this.Compts[0].name.name)
          this.mfinal.splice(index, 1);
      });
      this.Compts[0].name.answers_products.forEach((prod: any) => {
        this.ProductsEnabled.forEach((pe, index) => {
          console.log(prod.product.id);
          console.log(pe);
          if (prod.product.id === pe) {
            console.log('aaaaaabbb');

           this.ProductsEnabled.splice(index, 1);
            console.log('PE', this.ProductsEnabled);
          }
        });
        this.cIndic.forEach((pe, index) => {
          if (prod.product.id == pe) {
            console.log('ffffffff')
            this.cIndic.splice(index, 1);
   /* ************************************************* */

/*    this.mfinal.forEach((element) => {
    element.product.forEach((ep: { indication: boolean; name: any },index: number) => {
      console.log(ep.name)
      console.log(prod.product.id)
      if (( ep.name === prod.product.id ) && (ep.indication ==false)){
      element.product.splice(index,1)
      }
    
    });
  }); */

   /* -------------------------------------*/
          }

       
        });

      

          //this.ProductsEnabled = []
        this.cIndic = []

        this.Preparations.forEach((prep) => {
          this.ProductsEnabled.forEach((pe, index) => {
            if (this.cIndic.includes(prep) == true) {
              this.ProductsEnabled.splice(index, 1);
            }
          });
          if (prep.id == prod.product.id) {
            prep.checked = false;
          }
        });
        this.Complements.forEach((com) => {
          if (com.id === prod.product.id) {
            com.checked = false;
          }
        });
        this.mfinal.forEach((element, index) => {
          if (element.reponse == this.Compts[0].name.name)
            this.mfinal.splice(index, 1);
        });
      });

      if (this.mfinal.length !== 0) {
        this.mfinal.forEach((element, index) => {
          if (element.reponse == this.Compts[0].name.name)
            this.mfinal.splice(index, 1);
        });
        console.log('mfinal', this.mfinal);

        this.Compts[0].name.answers_products.forEach((prod: any) => {
          this.cIndic.forEach((pe, index) => {
            if (prod.product.id == pe) {
              this.cIndic.splice(index, 1);
            }
          });
          this.ProductsEnabled.forEach((pe, index) => {
            if (prod.id == pe) {
            this.ProductsEnabled.splice(index, 1);
            }
          });
        });

         this.ProductsEnabled = []
       this.cIndic = []
        this.mfinal.forEach((element) => {
          element.product.forEach((ep: { indication: boolean; name: any;product:any }) => {
            console.log(ep);

            if ( (this.ProductsEnabled.includes(ep.name) == false) &&(ep.indication == true )) {
{           this.ProductsEnabled.push(ep.product.id);

}            }

            if ((ep.indication === false) &&(this.cIndic.includes(ep.name) == false) ) {

              this.cIndic.push(ep.product.id);
              this.ProductsEnabled.forEach((pe, index) => {
                console.log('aaaaaaaaaaaaaaaaaaa',ep.product.id)
console.log('bbbbbbbbbbbb',pe)
                if (pe == ep.product.id) {
                  this.ProductsEnabled.splice(index, 1);

                }
              });
            }
          });
        });
        console.log(this.ProductsEnabled);
        console.log(this.cIndic)
        this.ProductsEnabled.forEach((pe, index) => {
          this.Preparations.forEach((prep) => {
            if (prep.id === pe) {
              console.log('iddddd', prep.id);

              prep.checked = true;
            }
          });
          this.Complements.forEach((prep) => {
            if (prep.id === pe) {
              console.log('iddddd', prep.id);

              prep.checked = true;
            }
          });
        });
      }
      this.Complements.forEach((com) => {
        if (com.checked == true) {
          if (this.ProductsEnabled.includes(com.id) == false) {
            this.ProductsEnabled.push(com.id);
          }
        }
      });
      this.Preparations.forEach((com) => {
        if (com.checked == true) {
          if (this.ProductsEnabled.includes(com.id) == false) {
            this.ProductsEnabled.push(com.id);
          }
        }
      });
      console.log('vide');
      console.log('PE', this.ProductsEnabled);
      console.log('CI', this.cIndic);
      console.log('mfinal', this.mfinal);
    }

    console.log('PE', this.ProductsEnabled);
    console.log('CI', this.cIndic);
    console.log('mfinal', this.mfinal);
  }

  showOptionsProducts(event: MatCheckboxChange): void {
    if (event.checked == true) {
      this.click=false;
      this.prods = [];
      this.prods.push({ prod: event.source.value });

      console.log(this.prods[0]);
      if (
        this.ProductsEnabled.length != 0 &&
        this.ProductsEnabled.includes(this.prods[0].prod) == false
      ) {
        {
          this.ProductsEnabled.push(this.prods[0].prod.id);
        }
      }
      if (this.ProductsEnabled.length == 0) {
        this.ProductsEnabled.push(this.prods[0].prod.id);
      }
    }
    if (event.checked == false) {
      this.click=false;
      this.prods = [];
      this.prods.push({ prod: event.source.value });

      console.log(this.prods[0]);
      if (this.ProductsEnabled.length != 0) {
        this.ProductsEnabled.forEach((pe, index) => {
          if (pe == this.prods[0].prod.id) {
            this.ProductsEnabled.splice(index, 1);
          }
        });
      }
    }

    console.log('PE', this.ProductsEnabled);
    console.log('CI', this.cIndic);
  }
  async SavePrescription() {
    console.log(this.Preparations);
    console.log(this.Complements);

    this.Complements.forEach((el) => {
      if ((el['checked'] == true)&&(this.Products.includes(el['id'])==false)) {

      this.Products.push(el['id']);

this.ProdImpression.push({ prod: el['name'], comment: el['comment'] });

      


      }
      this.mfinal.forEach((answ) => {
        if (this.answers.includes(answ.reponse) == false)
          this.answers.push(answ.reponse);
        if (this.questions.includes(answ.question) == false)
          this.questions.push(answ.question);
      });
    });
    console.log(this.Products);
    this.Preparations.forEach((prep) => {
      if ((prep['checked'] == true)&&(this.Products.includes(prep['id'])==false)) {
        this.Products.push(prep['id']);

        this.ProdImpression.push({ prod: prep['name'],comment: prep['comment'],   });

     
      }

      this.mfinal.forEach((answ) => {
        if (this.answers.includes(answ.reponse) == false)
          this.answers.push(answ.reponse);
        if (this.questions.includes(answ.question) == false)
          this.questions.push(answ.question);
      });
    });
    console.log(this.ProdImpression);
    localStorage.setItem('prodImpression', JSON.stringify(this.ProdImpression));
    let data = JSON.stringify({
      patient_id: JSON.parse(localStorage.getItem('profil')!),
      Products: this.Products,
      Answers: this.answers,
      question: this.questions,
    });
    console.log(data);
    (await this.RestPrescriptionService.AddPrescription(data)).subscribe(
      (response) => {
        console.log(response);
        this.AddPrescsucessNotification();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sucessNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Patient ajouté avec succées',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  AddPrescsucessNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'votre prescription est ajouté avec succées',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  failNotification() {
    Swal.fire({
      icon: 'info',
      title: 'Patient existe déjà !',
      text: 'veuillez remplir votre questionnaire !!',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  onPrintInvoice() {
    const invoiceIds = ['1'];

    this.printService.printDocument('prescription', invoiceIds);
    this.loader.show();
  }
  onChangeNom(ob: MatCheckboxChange) {
    localStorage.setItem('nomCheck', JSON.stringify(ob.checked));
  }
  onChangeLogo(ob: MatCheckboxChange) {
    localStorage.setItem('logoCheck', JSON.stringify(ob.checked));
  }
  onChangePrescription(ob: MatCheckboxChange) {
    localStorage.setItem('prescriptionCheck', JSON.stringify(ob.checked));
  }

  onChangeVille(ob: MatCheckboxChange) {
    localStorage.setItem('villeCheck', JSON.stringify(ob.checked));
  }
  onChangeEntreprise(ob: MatCheckboxChange) {
    localStorage.setItem('entrepriseCheck', JSON.stringify(ob.checked));
  }
  onChangeAll(ob: MatCheckboxChange) {
    localStorage.setItem('entrepriseCheck', JSON.stringify(ob.checked));
    localStorage.setItem('villeCheck', JSON.stringify(ob.checked));
    localStorage.setItem('logoCheck', JSON.stringify(ob.checked));
    localStorage.setItem('nomCheck', JSON.stringify(ob.checked));
    this.onChangeNom(ob);
    this.onChangeLogo(ob);
    this.onChangeVille(ob);
    this.onChangeEntreprise(ob);
    this.IsSelected = ob.checked;
  }
}
