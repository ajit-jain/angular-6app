import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'add-splitii',
  templateUrl: './add-splitii.component.html',
  styleUrls: ['./add-splitii.component.css']
})
export class AddSplitiiComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('nextBtn') nextBtn: ElementRef;

  @ViewChild('splitiiModal') splitiiModal: ElementRef;
  constructor(public _userService: UserService,
    private _fb: FormBuilder, private _router: Router) { }
  share = 0;

  addSplitiiForm: FormGroup;
  stepsCompleted = [];
  activeStep = 0;
  ngOnInit() {
    this.setInitialSteps();
    this._userService.userData.subscribe((data) => {
      if (data) {
        this.addSplitiiForm = this._fb.group(this.getSplitiiFormData(data));
      }
    });

  }
  getSplitiiFormData(data) {
    return {
      totalAmount: ['', Validators.required],
      paidBy: [data['name'], Validators.required],
      label: ['', Validators.required],
      name: [data['name']],
      partner_name: [data['partner_email']],
      isHalf: [true],
      share: [0.00]
    };
  }
  setInitialSteps() {
    this.stepsCompleted = [1];
    this.activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
  }
  back() {
    if (this.activeStep === 1) {
      this._router.navigate(['/site/dashboard']);
      return;
    }
    this.stepsCompleted.pop();
    this.activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
  }
  async next() {
    console.log(this.addSplitiiForm.value);
    try {

      this.addSplitiiForm.controls['totalAmount'].markAsTouched({ onlySelf: true });
      this.addSplitiiForm.controls['paidBy'].markAsTouched({ onlySelf: true });

      if (this.activeStep === 1 && !this.addSplitiiForm.get('totalAmount').valid) {
        return;
      } else if (this.activeStep === 2 && (!this.addSplitiiForm.get('paidBy').valid || !this.addSplitiiForm.get('label').valid)) {
        return;
      } else if (this.activeStep === 3) {

        this.nextBtn.nativeElement.textContent = 'Please Wait...';
        this.nextBtn.nativeElement.disabled = true;
        await this.addSplitii(this.addSplitiiForm.value);
        this.setInitialSteps();
        this.addSplitiiForm = this._fb.group(this.getSplitiiFormData(this._userService.user));
        this._router.navigate(['site/dashboard']);
        return;
      }
      this.stepsCompleted.push(this.activeStep + 1);
      this.activeStep = this.stepsCompleted[this.stepsCompleted.length - 1];
    } catch (e) {

    } finally {
      this.nextBtn.nativeElement.textContent = 'Next';
      this.nextBtn.nativeElement.disabled = false;
    }
  }
  async addSplitii(formData) {
    await this._userService.addSplitii(formData);
  }
  verifyAmount(event, totalAmount) {
    const enteredAmount = parseFloat(event.target.value) || '';
    if (enteredAmount && (enteredAmount > totalAmount)) {
      event.target.value = this.addSplitiiForm.get('totalAmount').value;
      this.addSplitiiForm.get('share').setValue(this.addSplitiiForm.get('totalAmount').value);
    }
  }
}
