import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-connected',
  templateUrl: './not-connected.component.html',
  styleUrls: ['./not-connected.component.css']
})
export class NotConnectedComponent implements OnInit {

  constructor(private _userService:UserService,private _authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  async logout(){
    await this._authService.signOut();
    this.router.navigate(['/']);
  }
}
