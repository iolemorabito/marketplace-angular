import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureAuthRoutingModule } from './feature-auth-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoreModule } from "../core/core.module";
import { AdminComponent } from './auth/admin/admin.component';
import { UserManagementComponent } from './auth/admin/user-management/user-management.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AdminComponent, UserManagementComponent],
  imports: [
    CommonModule,
    FeatureAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
]
})
export class FeatureAuthModule { }
