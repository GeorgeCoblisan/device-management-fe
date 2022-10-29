import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  onClickNavigateHome(): void {
    this.router.navigate(['/home']);
  }

  onClickNavigateClients(): void {
    const user = this.loginService.getUserLogged();
    if (user) {
      if (user.role === 'admin') {
        this.router.navigate(['/users']);
      }
      else {
        alert("You don't have access here!");
      }
    }
    else {
      alert("You have to log in first!");
    }
  }

  onClickNavigateDevices(): void {
    const user = this.loginService.getUserLogged();
    if (user) {
      this.router.navigate(['/devices']);
    }
    else {
      alert("You have to log in first!");
    }
  }

  onClickLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
