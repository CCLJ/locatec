import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const APP_ROUTES: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'navbar' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
