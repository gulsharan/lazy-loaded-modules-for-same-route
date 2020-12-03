import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appInjector } from './app.injector';
import { map, switchMap } from 'rxjs/operators';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardAuthGuard } from './auth/dashboard-auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [DashboardAuthGuard],
    loadChildren: () =>
      appInjector.pipe(
        map((injector) => injector.get(AuthService)),
        switchMap((authService) => {
          return authService.user$.pipe(
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
