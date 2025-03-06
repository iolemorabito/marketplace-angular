import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { AdminComponent } from './auth/admin/admin.component';
import { UserManagementComponent } from './auth/admin/user-management/user-management.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {path: 'register', component: RegisterComponent},
  { path: 'users', component: UserManagementComponent, canActivate: [AdminGuard] }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureAuthRoutingModule { }
