import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoadingService } from '../loading.service';
import {PrintService} from '../print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceIds: string[];
  invoiceDetails!: Promise<any>[];
path!:string;
  constructor(route: ActivatedRoute,
              private printService: PrintService,private router : Router,private loader:LoadingService) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit() {
    this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReady());
      this.loader.hide()
      this.path=JSON.parse(localStorage.getItem('currentUser')!).logo;
    localStorage.setItem('path',this.path)
    }

  getInvoiceDetails(invoiceId :any) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }

}
