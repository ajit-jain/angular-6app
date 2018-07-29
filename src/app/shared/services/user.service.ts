import { CookieService } from 'src/app/shared/services/cookie.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFirestore) { }
  user = {};
  selectedPayment: any;
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  async getUser(email) {
    try {
      const $docRef = this.db.collection('users').ref.where('email', '==', email);
      const ref = await $docRef.get();
      return ref.docs[0];
    } catch (e) {
      throw e;
    }
  }
  async createUser(details) {
    details['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();
    details['currency'] = {
      'symbol': '$',
      'name': 'US Dollar',
      'code': 'USD',
    };
    return (await this.db.collection('users').add(details));
  }
  async addSplitii(data) {
    try {
      const splitii = {
        label: data['label'],
        time: new Date(),
        totalAmount: data['totalAmount'],
        paidBy: (data['paidBy'] === this.user['name']) ? this.user['email'] : this.user['partner_email']
      };
      splitii['split'] = [
        {
          amount: data['isHalf'] ? (splitii['totalAmount'] / 2) : data['share'],
          email: splitii['paidBy']
        },
        {
          amount: data['isHalf'] ? (splitii['totalAmount'] / 2) : splitii['totalAmount'] - data['share'],
          email: (data['paidBy'] !== this.user['name']) ? this.user['email'] : this.user['partner_email']
        }
      ];
      console.log(splitii);
      return (await this.db.collection('expenses').add(splitii));
    } catch (e) {
      console.log(e);
    }
  }
  async setUserbyToken(token) {
    try {
      const email = atob(token).split(':')[0];
      if (email) {
        const user = (await this.getUser(email)).data();
        this.userData.next(user);
        user && (this.user = user);
      }
    } catch (e) {
      throw e;
    }

  }
}
