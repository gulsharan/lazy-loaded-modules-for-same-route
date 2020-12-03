import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appInjector } from './app.injector';
import { map, switchMap } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AppComponent,
    loadChildren: () =>
      appInjector.pipe(
        map((injector) => injector.get(AuthService)),
        switchMap((authService) => {
          return authService.loggedInUser().pipe(
            switchMap((user) => {
              switch (user.role) {
                case 'admin':
                  return import(
                    './modules/admin-dashboard/admin-dashboard.module'
                  ).then((m) => m.AdminDashboardModule);
                case 'user':
                  return import(
                    './modules/user-dashboard/user-dashboard.module'
                  ).then((m) => m.UserDashboardModule);
              }
            })
          );
        })
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
