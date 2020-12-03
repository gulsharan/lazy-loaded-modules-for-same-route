import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const admin = {
  name: 'Mike Hollander',
  role: 'admin',
};

const user = {
  name: 'John Doe',
  role: 'user',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  user$ = new ReplaySubject<IUser>();

  constructor(private router: Router) {}

  login(isAdmin?: boolean): void {
    this.user$.next(isAdmin ? admin : user);
    this.loggedIn$.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.user$.next(null);
    this.loggedIn$.next(false);
    location.href = '/login'; // reload the page after sign out to ensure lazy-loaded module gets unloaded
  }
}

export interface IUser {
  role: string;
}
