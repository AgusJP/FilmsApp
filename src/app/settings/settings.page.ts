import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  langs: string[] = []
  constructor(private translateService: TranslateService) { 
    this.langs = this.translateService.getLangs()
  }

  ngOnInit() {
  }

  toggleTheme(event){
    if(event.detail.checked) {
      document.body.setAttribute('color-theme','dark')
    }else {
      document.body.setAttribute('color-theme','light')
    }
  }

  changeLang(event) {
    this.translateService.use(event.detail.value)
  }
}
