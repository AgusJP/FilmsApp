import { User } from './../shared/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }
  
  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerificationEmail();
    } 
    catch (error) {
      console.log('Error ->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}
