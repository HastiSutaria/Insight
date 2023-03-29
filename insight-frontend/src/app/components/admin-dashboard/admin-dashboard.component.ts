import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  newForm: Boolean = false
  createForm() {
    console.log('callled  ')
    this.newForm = true
  }
}
