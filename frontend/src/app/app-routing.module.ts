import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EndpointsComponent} from './endpoints/endpoints.component';
import {MediaComponent} from './media/media.component';
import {AccountsComponent} from './accounts/accounts.component';
import {ApplicationsComponent} from './applications/applications.component';
import {CreateUpdateComponent} from './endpoints/create-update/create-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'media', component: MediaComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'applications', component: ApplicationsComponent},
  {path: 'endpoints/:id', component: CreateUpdateComponent},
  {path: 'endpoints', component: EndpointsComponent},
  {path: '', redirectTo: 'endpoints', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true, paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
