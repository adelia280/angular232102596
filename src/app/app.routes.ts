import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { LoginComponent } from './login/login';
import { NgModule } from '@angular/core';
import { Register } from './register/register';
import { Admin } from './admin/admin';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';

import { ChartJS } from './chart-js/chart-js';
import { Flot } from './flot/flot';
import { Mahasiswa } from './mahasiswa/mahasiswa';
import { otentikasiGuard } from './otentikasi-guard';
import { Logout } from './logout/logout';
import { Forex } from './forex/forex';


export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "dashboard", component: Dashboard, canActivate: [otentikasiGuard]},
    {path: "dashboard2", component: Dashboard2, canActivate: [otentikasiGuard]},
    {path: "dashboard3", component: Dashboard3},
    {path: "forex", component: Forex, canActivate: [otentikasiGuard]},
    {path: "login", component: LoginComponent},
    {path: "Mahasiswa", component: Mahasiswa, canActivate: [otentikasiGuard]},
    {path: "register", component: Register},
    
    {path: "chart-js", component: ChartJS},
    {path: "flot", component: Flot},
    {path: "admin", component: Admin},
    {path: "logout", component: Logout}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes{}
