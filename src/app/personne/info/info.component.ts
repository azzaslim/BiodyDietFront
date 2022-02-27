
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  private sub: any;
  nom!: String;
  prenom!: String;
  id!:number;
  idd!:number;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  
  this.nom = this.route.snapshot.params['nom'];
  this.prenom = this.route.snapshot.params['prenom'];

}}