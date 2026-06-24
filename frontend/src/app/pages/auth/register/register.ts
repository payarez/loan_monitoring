import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';
  password = '';

  register() {
    console.log('register', this.username, this.email, this.password);
  }
}