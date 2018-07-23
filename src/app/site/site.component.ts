import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    const address = window.location.href;
    const childRoute = address.split('/');
    let isChildRoute = false;
    for (let i = 0; i <= childRoute.length; i++) {
      if (['dashboard', 'settings', 'addSplitii'].includes(childRoute[i])) {
        isChildRoute = true;
        break;
      }
    }
    if (!isChildRoute) {
      this._router.navigate(['/site/dashboard']);
    }
  }

}
