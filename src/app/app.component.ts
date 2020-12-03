import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, IUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
  }
}
