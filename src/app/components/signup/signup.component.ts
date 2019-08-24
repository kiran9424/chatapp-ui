import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  isLoading = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService:TokenService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signup() {
    this.isLoading = true;
    this.authService.signup(this.signupForm.value).subscribe(
      (data) => {
        this.signupForm.reset();
        this.tokenService.setToken(data.token);
        setTimeout(() => {
          this.router.navigate(['/streams']);
        }, 3000)
      },
      (err) => {
        this.isLoading = false;
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }

        if (err.error.errors) {
          this.errorMessage = err.error.errors;
        }
      })
  }

}
