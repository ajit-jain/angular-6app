import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'splitii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() modifyAuthType: EventEmitter<any> = new EventEmitter<any>();
  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  loginForm: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  changeAuthType(type) {
    this.modifyAuthType.emit(type);
  }
  login(formDetails) {
    this.userLoggedIn.emit(formDetails);
  }
}
