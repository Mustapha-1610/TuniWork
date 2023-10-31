import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-freelancerlayout',
  templateUrl: './freelancerlayout.component.html',
  styleUrls: ['./freelancerlayout.component.css'],
})
export class FreelancerlayoutComponent {
  username: string = '';
  password: string = '';
  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      username: this.username,
      password: this.password,
    };

    // Replace 'your-api-endpoint' with the actual API endpoint
    this.http
      .get('http://localhost:5000/api/admin/getAll/freelancers')
      .subscribe(
        (response) => {
          // Handle the API response here
          console.log('API response:', response);
        },
        (error) => {
          // Handle API request error here
          console.error('API request error:', error);
        }
      );
  }
}
