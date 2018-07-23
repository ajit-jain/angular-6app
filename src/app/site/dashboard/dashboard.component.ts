import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Moment } from 'moment';
import { IgxCalendarComponent } from 'igniteui-angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('calendar', { read: IgxCalendarComponent }) public calendar: IgxCalendarComponent;

  public intlDateTimeFormat = new Intl.DateTimeFormat() as any;
  public formatParts: boolean = this.intlDateTimeFormat.formatToParts;
  public getDatePart(val: any, component: any, datePart: string) {
    const date = val.date as Date;
    const locale = component.locale;
    const formatOptions: Intl.DateTimeFormatOptions = {};
    formatOptions[datePart] = component.formatOptions[datePart];

    return date.toLocaleString(locale, formatOptions);

    // instead of toLocaleString we can use Intl.DateTimeFormat.format as well:
    // const partFormatter = new Intl.DateTimeFormat(locale, formatOptions);
    // return partFormatter.format(date);
}
  ngAfterViewInit(): void {
  }
  payments = [
    {
      _id: 'text1',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text2',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text3',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text4',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text5',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text6',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    },
    {
      _id: 'text7',
      amount: 15.00,
      paid: {
        by: 'jenniffer',
        description: ' Grocery '
      },
      breakDowns: [
        { user: 'jennifer', share: 5.00 },
        { user: 'robert', share: 10.00 }
      ],
      createdAt: new Date().toDateString()
    }

  ];
  ngOnInit() {
  }

  verifyRange(dates) {
    console.log(dates);
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
}
