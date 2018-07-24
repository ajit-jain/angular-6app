import { CookieService } from './shared/services/cookie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('modal') modal:ElementRef;
  token = '';
  stepsCompleted = [1];
  addSplitiiForm: FormGroup;
  activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
  constructor(private _cookieService: CookieService,
    private _fb: FormBuilder) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    this.addSplitiiForm = this._fb.group({
      amount: ['', Validators.required],
      paidBy: ['jeniffer', Validators.required],
      description: ['', Validators.required]
    });
    // if (token) {
    //   window.location.href = `${environment.APP_PROTOCOL}${environment.APP_EXTENSION}/dashboard`; 
    // }
  }
  isUserLoggedIn() {
    return this._cookieService.readCookie('token');
  }
  back() {
    if (this.activeStep === 1) {
      return;
    }
    this.stepsCompleted.pop();
    this.activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
  }
  next() {
    console.log(this.addSplitiiForm.value);
    if (this.activeStep === 1 && !this.addSplitiiForm.get('amount').valid){
      return;
    }else if (this.activeStep === 2 && (!this.addSplitiiForm.get('paidBy').valid || !this.addSplitiiForm.get('description').valid)){
      return;
    }else if (this.activeStep === 3) {
      this.modal.nativeElement.click();
    }
    this.stepsCompleted.push(this.activeStep + 1);
    this.activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
  }
  cha(event){
    console.log(event.target);
  }
}
