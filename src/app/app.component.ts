import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { User } from './shared/user.interface';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Sign out', url: '/login', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router, private translateService: TranslateService) {
    this.translateService.setDefaultLang('English')
    this.translateService.addLangs(['English', 'Español'])
  }


  async logout(): Promise<void> {
    try {
      this.authSvc.logout();
      this.router.navigate(['login']);
    }
    catch (err) {
      console.log(err);
    }
  }
}
