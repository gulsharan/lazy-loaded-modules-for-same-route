import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const users = [
  {
    name: 'Mike Hollander',
    role: 'admin',
  },
  {
    name: 'John Doe',
    role: 'user',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new ReplaySubject<IUser>();
  loggedInUser(): Observable<IUser> {
    const idx = Math.floor(Math.random() * 10) % 2;
    return of(users[idx]).pipe(
      delay(1000),
      tap((user) => this.user$.next(user))
    );
  }
}

export interface IUser {
  role: string;
}
