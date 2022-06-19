import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css'],
})
export class PrintLayoutComponent implements OnInit {
  nom!: string;
  entreprise!: string;
  pNom!: string;
  pAge!: string;
  pHeight!: string;
  pWeight!: string;
  adresse!: string;
  ville!: string;
  nomCheck!: boolean;
  logoCheck!: boolean;
  adresseCheck!: boolean;
  Products: Array<any> = [];
  prodImpression: Array<any> = [];
  comment: Array<any> = [];

  prescriptionCheck!: boolean;
  villeCheck!: boolean;
  entrepriseCheck!: boolean;
  fileData!: File;
  previewUrl!: any;
  ImageUrl!: any;
  reader = new FileReader();
  path!: any;
  fileUploadProgress!: string;
  uploadedFilePath!: string;
  constructor() {}

  ngOnInit() {
    this.fileProgress(this.fileData);
    this.infoToPrint();
  }
  infoToPrint() {
    this.nomCheck = JSON.parse(localStorage.getItem('nomCheck')!);
    this.logoCheck = JSON.parse(localStorage.getItem('logoCheck')!);
    this.prescriptionCheck = JSON.parse(
      localStorage.getItem('prescriptionCheck')!
    );
    this.villeCheck = JSON.parse(localStorage.getItem('villeCheck')!);
    this.entrepriseCheck = JSON.parse(localStorage.getItem('entrepriseCheck')!);

    this.nom = JSON.parse(localStorage.getItem('currentUser')!)[
      'firstName'
    ].concat(
      '  ' + JSON.parse(localStorage.getItem('currentUser')!)['lastName']
    );
    (this.adresse = JSON.parse(localStorage.getItem('currentUser')!)[
      'adresse'
    ]),
      (this.ville = JSON.parse(localStorage.getItem('currentUser')!)[
        'ville'
      ].concat(
        ' ' + JSON.parse(localStorage.getItem('currentUser')!)['codePostale']
      ));
    this.entreprise = JSON.parse(localStorage.getItem('currentUser')!)[
      'entreprise'
    ];
    let N = localStorage.getItem('Pprenom')!;
    if (N) {
      this.pNom = localStorage
        .getItem('Pprenom')!
        .concat(' ' + localStorage.getItem('Pnom')!);
    } else {
      this.pNom = localStorage
        .getItem('prenom')!
        .concat(' ' + localStorage.getItem('nom')!);
    }
    let H = JSON.parse(localStorage.getItem('Height')!) + 'cm';
    if (H) {
      this.pHeight = H;
    } else {
      this.pHeight = JSON.parse(localStorage.getItem('height')!) + 'cm';
    }
    let W = JSON.parse(localStorage.getItem('Weight')!) + 'Kg';
    if (W) {
      this.pWeight = W;
    } else {
      this.pWeight = JSON.parse(localStorage.getItem('weight')!) + 'Kg';
    }

    let age = new Date(localStorage.getItem('BirthDate')!);
    let age2 = new Date(localStorage.getItem('Birthdate')!);
    if (age) {
      let timeDiff = Date.now() - age.getTime();
      this.pAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365) + ' ans';
    } else {
      let timeDiff = Date.now() - age2.getTime();
      this.pAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365) + ' ans';
    }
    this.prodImpression = JSON.parse(localStorage.getItem('prodImpression')!);
    if (this.prodImpression.length != 0) {
      this.prodImpression.forEach((elm) => {
        this.Products.push(elm.prod);
        this.comment.push(elm.comment);
      });
    }
    console.log(this.prodImpression);
    this.path = JSON.parse(localStorage.getItem('currentUser')!).logo;

    this.previewUrl = 'assets/' + this.path;
    console.log(this.previewUrl);
    // localStorage.removeItem('profil');
  }
  async fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    await this.preview();
  }

  async preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      console.log(mimeType);
      return;
    }
    this.reader.readAsDataURL(this.fileData);
    console.log(this.fileData);
    this.reader.onload = (_event) => {
      this.previewUrl = this.reader.result;
      localStorage.setItem('previewUrl', this.previewUrl);
    };
  }
}
