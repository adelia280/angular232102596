import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { LoginComponent } from './login/login';
import { NgModule } from '@angular/core';
import { Register } from './register/register';
import { Admin } from './admin/admin';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';
import { Widgets } from './widgets/widgets';
import { ChartJS } from './chart-js/chart-js';
import { Flot } from './flot/flot';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "dashboard", component: Dashboard},
    {path: "dashboard2", component: Dashboard2},
    {path: "dashboard3", component: Dashboard3},
    {path: "login", component: LoginComponent},
    {path: "register", component: Register},
    {path: "widgets", component: Widgets},
    {path: "chart-js", component: ChartJS},
    {path: "flot", component: Flot},
    {path: "admin", component: Admin}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes{}
