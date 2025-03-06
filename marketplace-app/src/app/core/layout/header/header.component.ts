import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/feature-auth/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLoggedIn: boolean = false;
showDropdown: boolean = false;
userName: string | null = null;
isAdmin: boolean = false;

constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.authService.isLoggedIn().subscribe( status => {
      this.isLoggedIn = status;
    });

    this.authService.getUserName().subscribe(name => {
      this.userName = name;
    });

    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = role === 'admin';
    });
  }

  toggleDropdown() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']); // Se non loggato, va al login
    } else {
      this.showDropdown = !this.showDropdown; // Se loggato, mostra il menu
    }
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-icon-container')) {
      this.showDropdown = false;
    }
  }
}
