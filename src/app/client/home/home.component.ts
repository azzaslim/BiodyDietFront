import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../Services/RestUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private RestUserService:RestUserService) { }

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('profil');

    
  }

}
