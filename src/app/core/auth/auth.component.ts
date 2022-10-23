import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error: string | undefined;
  
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  user!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.loginService.getUser(this.form.value.email, this.form.value.password).pipe(
      first(),
      tap((user) => { 
        this.user = user;
        console.log(user);
        this.checkUserData();
      }),
    ).subscribe({
      error: (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    });
  }

  checkUserData() {
    if (this.user && this.form.value.email === this.user.email && this.form.value.password === this.user.password) {
      console.log(this.user);
      this.router.navigate(['/home']);
    }
    else {
      this.error = "Email or password incorrect!";
    }
  }

  handleError(err: HttpErrorResponse): void {
    this.error = "Email or password incorrect!";
  }

}
