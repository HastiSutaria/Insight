import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private userSub: Subscription;
  isLoggedIn = false;
  
  constructor(private auth: AuthService) {}

  // ngOnInit(): void {
  //   this.userSub = this.auth.user.subscribe(user => {
  //     this.isAuthenticated = !!user
  // })
  // }
  
  logout() {
    this.auth.logoutUser();
    this.isLoggedIn = false;
  }
}
