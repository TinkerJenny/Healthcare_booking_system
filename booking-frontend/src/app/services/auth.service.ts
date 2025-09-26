// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser: Observable<User | null>;

//   constructor() {
//     // Check if user is stored in localStorage
//     const storedUser = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<User | null>(
//       storedUser ? JSON.parse(storedUser) : null
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // Simple login method (you can enhance this with JWT later)
//   login(user: User): void {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     this.currentUserSubject.next(user);
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }

//   isLoggedIn(): boolean {
//     return this.currentUserValue !== null;
//   }

//   isDoctor(): boolean {
//     return this.currentUserValue?.role === 'DOCTOR';
//   }

//   isPatient(): boolean {
//     return this.currentUserValue?.role === 'PATIENT';
//   }
// }

// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage in browser environment
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  private setStoredUser(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(user: User): void {
    this.setStoredUser(user);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.setStoredUser(null);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  isDoctor(): boolean {
    return this.currentUserValue?.role === 'DOCTOR';
  }

  isPatient(): boolean {
    return this.currentUserValue?.role === 'PATIENT';
  }
}