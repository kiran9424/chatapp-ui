import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;
  isLoading = false;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private tokenService:TokenService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signin() {
    this.isLoading = true;
    this.authService.signin(this.signinForm.value).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 2000);
      }, (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.errors;
      });
  }

}
