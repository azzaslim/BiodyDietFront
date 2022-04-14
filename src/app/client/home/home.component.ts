import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/RestUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService) { }

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('profil');

    localStorage.setItem("currentUser",(JSON.stringify(await this.authService.getProfile())));

  }

}
