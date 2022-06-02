import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router,private loader:LoadingService) { }

  printDocument(documentName: string, documentData: string[]) {
    this.isPrinting = true;

    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}]);

  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
   // this.router.navigate(['/home'])

  }

}
