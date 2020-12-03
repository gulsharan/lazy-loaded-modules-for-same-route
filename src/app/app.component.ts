import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService, IUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loading$ = this.authService.user$.pipe(
      map((user) => !user),
      startWith(true)
    );
  }
}
