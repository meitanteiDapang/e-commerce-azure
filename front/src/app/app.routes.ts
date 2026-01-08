import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home';
import { BookingComponent } from './booking/booking';
import { BookingSuccessComponent } from './booking/success/success';
import { AdminLoginComponent } from './admin/login/login';
import { AdminPageComponent } from './admin/page/page';
import { adminAuthGuard } from './admin/admin-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'book',
    title: 'Booking',
    component: BookingComponent,
  },
  {
    path: 'booked',
    title: 'Booking successfully',
    component: BookingSuccessComponent,
  },
  {
    path: 'adminLogin',
    title: "Admin Login",
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    title: "admin board",
    component: AdminPageComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
