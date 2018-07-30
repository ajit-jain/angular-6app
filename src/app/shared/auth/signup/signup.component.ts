import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'splitii-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @Output() modifyAuthType: EventEmitter<any> = new EventEmitter<any>();
  @Output() userCreated: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('btnRef') btnRef: ElementRef;
  constructor(private _fb: FormBuilder, private _userService: UserService,
    private _authService: AuthService) { }
  error: any;
  ngOnInit() {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      partner_email: ['', [Validators.required, Validators.email]]
    });
  }
  changeAuthType(type) {
    this.modifyAuthType.emit(type);
  }
  async createAccount(formDetails) {
    this.error = '';
    this.btnRef.nativeElement.textContent = 'Please Wait...';
    this.btnRef.nativeElement.disabled = true;

    try {
      if (formDetails['email'].trim() === formDetails['partner_email'].trim()) {
        this.error = 'Partner Email should be distinct from email';
      } else {
        await this._authService.signUpWithEmail(formDetails['email'], formDetails['password']);
        // const userData = await this._userService.getUser(formDetails['email']);
        // if (userData) {
        //   this.error = 'Email already registered';
        // } else {
        const userRef = await this._userService.createUser(formDetails);
        this._userService.user = (await userRef.get()).data();
        console.log(this._userService.user);
        this.userCreated.emit(Object.assign(formDetails, { id: userRef.id }));
        // }
      }
    } catch (e) {
      this.error = e['message'];
      console.log(e);
    } finally {
      this.btnRef.nativeElement.textContent = 'Create Account';
      this.btnRef.nativeElement.disabled = false;
    }
  }
}
