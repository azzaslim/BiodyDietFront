import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editcompte',
  templateUrl: './editcompte.component.html',
  styleUrls: ['./editcompte.component.css']
})
export class EditcompteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('profil');

  }

}
