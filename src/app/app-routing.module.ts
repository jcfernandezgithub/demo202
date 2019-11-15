import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './pages/user/user.component';
import { ResetComponent } from './pages/reset/reset.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/user',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
