import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSplitiiComponent } from './add-splitii.component';

describe('AddSplitiiComponent', () => {
  let component: AddSplitiiComponent;
  let fixture: ComponentFixture<AddSplitiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSplitiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSplitiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
