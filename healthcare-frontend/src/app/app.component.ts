// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'healthcare-frontend';
//   showNavbar = false;

//   constructor(private router: Router) {}

//   ngOnInit() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.showNavbar = !event.url.includes('/login') && !event.url.includes('/register');
//       }
//     });
//   }

//   logout() {
//     localStorage.removeItem('user');
//     this.router.navigate(['/login']);
//   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule,      // For *ngIf directive
//     RouterOutlet       // For <router-outlet>
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'your-app-name';
//   showNavbar = true; // or whatever logic you have
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,      // For *ngIf directive
    RouterOutlet       // For <router-outlet>
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'your-app-name';
  showNavbar = true; // or whatever logic you have

  logout() {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: clear user session, redirect to login, etc.
    // this.router.navigate(['/login']);
    // localStorage.removeItem('userToken');
  }
}