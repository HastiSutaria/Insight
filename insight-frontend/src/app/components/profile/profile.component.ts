import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  fullname: any;
  username: any;
  email: any;
  passsword: any = '';
  public user: any;
  profilePictureUrl: SafeUrl;
  isUploaded: boolean = false;
  constructor(private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUserData();
    this.getProfilePicture();
  }

  getUserData() {
    this.auth.getProfile().subscribe(
      (data) => {
        if (data['user']) {
          this.user = data['user'];
          this.fullname = this.user.fullname;
          this.username = this.user.username;
          this.email = this.user.email;
        }
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  updateProfile() {
    if (this.passsword !== '') {
      this.auth
        .editProfile({
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: this.passsword,
        })
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.auth
        .editProfile({
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: this.passsword,
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
    this.toastr.success('Success', 'Profile Updated!');
  }

  uploadProfilePicture(input: any) {
   
    const file = input.files[0];

    this.auth.editProfilePicture(file).subscribe((response) => {
      // Handle response from backend, such as updating profile picture URL
      console.log(response)
      input.value = ''
      this.getProfilePicture()

    });
    this.toastr.success('Success', 'Profile picture uploaded!');
  }

  getProfilePicture() {
    this.auth.getProfilePicture().subscribe(
      (safeUrl) => {
        this.profilePictureUrl = safeUrl;
      },
      (error) => {
        console.log('Failed to get profile picture', error);
      }
    );
  }
}
