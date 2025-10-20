import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { LoginComponent } from './login/login';
import { NgModule } from '@angular/core';
import { Register } from './register/register';
import { Admin } from './admin/admin';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "dashboard", component: Dashboard},
    {path: "login", component: LoginComponent},
    {path: "register", component: Register},
    {path: "admin", component: Admin}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes{}
