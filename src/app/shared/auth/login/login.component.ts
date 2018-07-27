import { UserService } from './../../services/user.service';
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
  constructor(private _fb: FormBuilder, private _userService: UserService) { }
  error = '';
  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  changeAuthType(type) {
    this.modifyAuthType.emit(type);
  }
  async login(formDetails) {
    this.error = '';
    try {
      const userData = await this._userService.getUser(formDetails['email']);
      if (userData) {
        this._userService.user = userData.data();
        this.userLoggedIn.emit(Object.assign(formDetails, { id: userData.id }));
      } else {
        this.error = 'Email not registered.. Please Signup';
      }
    } catch (e) {
      console.log(e);
    }
  }
}
