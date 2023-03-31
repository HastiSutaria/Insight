import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/helpers/validation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // const userData = JSON.stringify(this.form.value);
    console.log(this.form.value)
    // let registerUserData = {
    //     fullname: this.form.
    // }
    this.registerUser(this.form.value)
    this.onReset();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  registerUser(registerUserData: any) {
    this.auth.registerUser(registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/admin-dashboard'])
      },
      (err) => console.log(err)
    );
  }
}
