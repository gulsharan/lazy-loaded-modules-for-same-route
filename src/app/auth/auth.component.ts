import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginAsUser(): void {
    this.authService.login();
  }

  loginAsAdmin(): void {
    this.authService.login(true);
  }
}