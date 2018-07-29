import { CookieService } from 'src/app/shared/services/cookie.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Moment } from 'moment';
import { IgxCalendarComponent } from 'igniteui-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { merge, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
declare var moment: any;
declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedDates = [];
  selectedPayment = {};
  constructor(public _userService: UserService,
    private db: AngularFirestore,
    private cookieService: CookieService) {

  }
  mt = moment;
  @ViewChild('calendar', { read: IgxCalendarComponent }) public calendar: IgxCalendarComponent;
  payments: Array<any> = [];
  isMonthly = false;
  expenses = {
    total_expenses: '00.00',
    creditor: '',
    debitor: '',
    amountLeft: 0
  };
  allPayMents = [];
  dateFilter = {
    firstDay: new Date(),
    lastDay: new Date()
  };
  public intlDateTimeFormat = new Intl.DateTimeFormat() as any;
  public formatParts: boolean = this.intlDateTimeFormat.formatToParts;
  public getDatePart(val: any, component: any, datePart: string) {
    const date = val.date as Date;
    const locale = component.locale;
    const formatOptions: Intl.DateTimeFormatOptions = {};
    formatOptions[datePart] = component.formatOptions[datePart];
    return date.toLocaleString(locale, formatOptions);
  }

  ngOnInit() {
    this.initializeThisMonth();
    const token = this.cookieService.readCookie('token');

    this._userService.userData.subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.getPayMents();
        }, 100);
      }
    });
  }
  initializeThisMonth() {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    this.dateFilter['firstDay'] = new Date(this.getStartOfDay(new Date(y, m, 1)));
    this.dateFilter['lastDay'] = new Date(this.getEndOfDay(new Date(y, m + 1, 0)));
    console.log(this.dateFilter);
  }
  getPayMents() {
    combineLatest(
      this.db.collection('expenses', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('paidBy', '==', this._userService.user['email']);
        return query;
      }).snapshotChanges(),
      this.db.collection('expenses', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('paidBy', '==', this._userService.user['partner_email']);
        return query;
      }).snapshotChanges()
    ).subscribe((data: any) => {
      console.log(data);
      let user1 = this.filterData(data[0]);
      let user2 = this.filterData(data[1]);
      this.allPayMents = ([...user1, ...user2]);
      this.setPayments(this.allPayMents);
    });
  }

  filterData(data) {
    return data.map(test => {
      const doc = test.payload.doc;
      return Object.assign(doc.data(), { id: doc.id });
    });
  }
  filterDataByDate(data) {
    data = data.map((d) => {
      d['time'] = moment(d['time'].toDate());
      return d;
    });
    const sortedArray = data.sort(function (a, b) {
      return Number(new Date(b.time)) - Number(new Date(a.time));
    });
    return sortedArray.filter(d => {
      const diff = (d.time - Number(new Date(this.dateFilter.firstDay)));
      const diff2 = (d.time - Number(new Date(this.dateFilter.lastDay)));
      return (diff >= 0 && diff2 <= 0);
    });
  }
  verifyRange(dates) {
    console.log(dates);
    this.selectedDates = dates;
  }
  toggleIcon($event, id) {
    const icon = document.getElementById(id);
    if (icon && icon.classList.contains('fa-caret-down')) {
      icon.classList.remove('fa-caret-down');
      icon.classList.add('fa-caret-up');
    } else {
      icon.classList.add('fa-caret-down');
      icon.classList.remove('fa-caret-up');
    }
  }
  getTotalExpenses(data) {
    return data.reduce((acc, d) => (acc + d.totalAmount), 0);
  }
  whoOwesWhat(data) {
    let obj = {};
    data.forEach((d) => {
      obj[d['paidBy']] = obj[d['paidBy']] ? (obj[d['paidBy']] + d['split'][1]['amount']) : d['split'][1]['amount'];
    });
    let arr = Object.keys(obj).map((key) => {
      return { key, amount: obj[key] };
    });
    if (arr.length > 1 && arr[0]['amount'] > arr[1]['amount']) {
      return ({
        creditor: arr[1]['key'],
        debitor: arr[0]['key'],
        amountLeft: arr[0]['amount'] - arr[1]['amount']
      });
    } else if (arr.length > 1 && arr[1]['amount'] > arr[0]['amount']) {
      return ({
        creditor: arr[0]['key'],
        debitor: arr[1]['key'],
        amountLeft: arr[1]['amount'] - arr[0]['amount']
      });
    } else if (arr.length > 1 && arr[1]['amount'] === arr[0]['amount']) {
      return ({
        creditor: arr[0]['key'],
        debitor: arr[1]['key'],
        amountLeft: arr[1]['amount'] - arr[0]['amount']
      });
    } else if (arr.length === 1) {
      return ({
        creditor: (arr[0]['key'] === this._userService.user['email']) ?
          this._userService.user['partner_email'] :
          this._userService.user['email'],
        debitor: arr[0]['key'],
        amountLeft: arr[0]['amount']
      });
    } else {
      return ({
        creditor: '',
        debitor: '',
        amountLeft: 0
      });
    }
  }
  initializeCalender() {
    this.isMonthly = true;
    const today = new Date(this.getStartOfDay(new Date()));
    this.selectedDates = [today];
    this.calendar.selectDate(today);
  }
  getStartOfDay(day) {
    return new Date(day).setHours(0, 0, 0, 0);
  }
  getEndOfDay(day) {
    return new Date(day).setHours(23, 59, 59, 999);
  }
  getDates(selectedDates) {
    let firstDay = new Date(this.getStartOfDay(selectedDates[0]));
    let lastDay = new Date(this.getEndOfDay(selectedDates[selectedDates.length - 1]));
    console.log(firstDay, lastDay);
    this.setDatefilter(firstDay, lastDay);
    this.setPayments(this.allPayMents);
  }
  setDatefilter(firstDay, lastDay) {
    this.dateFilter.firstDay = firstDay;
    this.dateFilter.lastDay = lastDay;
  }
  setPayments(payments) {
    this.payments = this.filterDataByDate(payments);
    this.expenses.total_expenses = this.getTotalExpenses(this.payments);
    const { creditor, debitor, amountLeft } = this.whoOwesWhat(this.payments);
    this.expenses.creditor = creditor;
    this.expenses.debitor = debitor;
    this.expenses.amountLeft = amountLeft;
  }
  setMonthFilter() {
    this.isMonthly = false;
    this.initializeThisMonth();
    this.selectedDates = [];
    this.setPayments(this.allPayMents);
  }
  openModal(payment) {
    this._userService.selectedPayment = payment;
    this.selectedPayment = payment;
    jQuery('#delete-modal').modal('show');
  }
}
