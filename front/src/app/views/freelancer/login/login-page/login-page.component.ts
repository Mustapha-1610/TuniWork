import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.signupForm.value);

    // Send a http request to your API
    this.http
      .post('https://your-api-url.com/signup', this.signupForm.value)
      .subscribe((response) => {
        console.log(response);
        // handle your response here
      });
  }
}
