import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.users = this.authService.getAllUsers();
  }


  removeUser(email: string) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Questa azione eliminerà definitivamente l\'utente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sì, elimina!',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(email);
        this.loadUsers();
        Swal.fire('Eliminato!', 'L\'utente è stato rimosso con successo.', 'success');
      }
    });
  }
}
