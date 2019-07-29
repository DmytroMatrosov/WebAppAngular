import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) {
  
  }
  // Create variable login of type FormGroup, assigns instance of class FormGroup.
  // Pass arguments to FormGroup constructor object with properties userName and password.
  // Properties type - FormControl, passing to FormControl constructor arguments - "", validator.
  private endPoint: string = environment.APIEndpoint; 

  login: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onSubmit(event) {
    this.http.post(
      `${this.endPoint}signin`,
      this.login.value,
      {observe: 'response'}
    )
    .subscribe(
      response => {
        let token = response.headers.get('Authorization');
        localStorage.setItem('token', token);
      }
      )
  }

  ngOnInit() {
  }


}
