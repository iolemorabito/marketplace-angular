import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private loggedInUser = new BehaviorSubject<string | null>(this.getLoggedUserName());
  private userRole = new BehaviorSubject<string | null>(this.getLoggedUserRole());
  
  constructor(private router: Router, private toastr: ToastrService) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('userToken');
  }

  private getLoggedUserName(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }

  private getLoggedUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  register(user: { name: string; surname: string; birthdate: string; email: string; password: string }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u:any) => u.email === user.email)) {
      this.toastr.error('Email già registrata!', 'Errore');
      return false;
    }

    let role = 'user';

    if(user.email === 'mkplace@admin.it' && user.password === 'Mkplace123*'){
      role = 'admin';
    }

    const newUser = {...user, role};

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.toastr.success('Registrazione completata! Ora puoi accedere.', 'Benvenuto!');
    return true;
  }

  login(email:string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if(user) {
      localStorage.setItem('userToken','fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      this.isAuthenticated.next(true);
      this.userRole.next(user.role);
      this.loggedInUser.next(user.name);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.loggedInUser.next(null);
    this.userRole.next(null);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUserName(): Observable<string | null> {
    return this.loggedInUser.asObservable();
  }

  getUserRole(): Observable<string> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = (user.email === 'mkplace@admin.it' && user.password === 'Mkplace123*') ? 'admin' : 'user';
    return new BehaviorSubject<string>(role).asObservable();
  }
  

  isAdmin(): boolean {
    return this.getLoggedUserRole() === 'admin';
  }

  getAllUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  deleteUser(email: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
  
    if (email === 'mkplace@admin.it') {
      Swal.fire('Errore', 'Non puoi eliminare l\'admin!', 'error');
      return;
    }
  
    users = users.filter((user: any) => user.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
  }


  
}
