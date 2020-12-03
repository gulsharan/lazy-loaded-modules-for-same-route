import { UserDashboardComponent } from './user-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserDashboardComponent,
      },
    ]),
  ],
  declarations: [UserDashboardComponent],
})
export class UserDashboardModule {}
