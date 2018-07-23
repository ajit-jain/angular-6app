import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      partner_email: ['', [Validators.required, Validators.email]]
    });
  }
  changeAuthType(type) {
    this.modifyAuthType.emit(type);
  }
  createAccount(formDetails) {
    this.userCreated.emit(formDetails);
  }
}
