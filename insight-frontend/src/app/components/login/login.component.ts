import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Validation from 'src/app/helpers/validation';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
   
  });
  submitted = false;
  error = ''

  constructor(private formBuilder: FormBuilder,private auth: AuthService, private _router : Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },
      // {
      //   validators: [Validation.match('password', 'confirmPassword')]
      // }
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
    this.loginUser(this.form.value)
    this.onReset();
    

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  loginUser(loginUserData: any) {
    this.auth.loginUser(loginUserData).subscribe(
      (res) => {
        console.log('Token, User', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        this.toastr.success('Success', "You've successfully loggedin!");
        this._router.navigate(['/admin-dashboard'])
      },
      (err) => this.toastr.error(err.error)
    );

  }
}
