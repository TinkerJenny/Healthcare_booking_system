// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideAnimationsAsync(),
//     provideHttpClient()
//   ]
// }).catch(err => console.error(err));

// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient } from '@angular/common/http';

// // Import your components
// import { LoginComponent } from './app/components/login/login.component';
// import { RegisterComponent } from './app/components/register/register.component';
// import { DashboardComponent } from './app/components/dashboard/dashboard.component';
// import { AppointmentBookingComponent } from './app/components/appointment-booking/appointment-booking.component';
// import { AuthGuard } from './app/guards/auth.guard';
// import { Role } from './app/models/role.enum';
// import { Routes } from '@angular/router';

// // Define routes directly here (copied from your app-routing.module.ts)

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'book-appointment',
//     component: AppointmentBookingComponent,
//     canActivate: [AuthGuard],
//     data: { role: Role.PATIENT }
//   },
//   { path: '**', redirectTo: '/dashboard' }
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideAnimationsAsync(),
//     provideHttpClient(),
//     AuthGuard  // Add AuthGuard as provider
//   ]
// }).catch(err => console.error(err));

// src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient } from '@angular/common/http';
// import { AuthGuard } from './app/guards/auth.guard';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes), // ✅ using routes from app.routes.ts
//     provideAnimationsAsync(),
//     provideHttpClient(),
//     AuthGuard // ✅ required for canActivate to work
//   ]
// }).catch(err => console.error(err));


// src/main.ts - Updated with proper providers
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/guards/auth.guard';
import { UserService } from './app/services/user.service';
import { AuthService } from './app/services/auth.service';
import { PLATFORM_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), // This provides HttpClient globally
    AuthGuard,
    UserService,  // Ensure UserService is provided
    AuthService,  // Ensure AuthService is provided
    { provide: PLATFORM_ID, useValue: 'browser' } // Provide PLATFORM_ID for SSR/browser detection
  ]
}).catch(err => console.error(err));
