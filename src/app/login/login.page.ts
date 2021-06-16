import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {}

  
  public async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login successfully.',
      duration: 2000
    });
    toast.present();
  }

  
  public async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Can not login, email or password incorrect.',
      duration: 2000
    });
    toast.present();
  }
 
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value)
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user)
        this.presentToast()
        this.redirectUser(isVerified)
      } else {
        this.presentToastError()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

 async onLoginGoogle(){
   try{
    const user = await this.authSvc.loginGoogle()
    if (user) {
      const isVerified = this.authSvc.isEmailVerified(user)
      this.redirectUser(isVerified)
    }
   }
   catch(err){
     console.log(err)
   }
 }

 private redirectUser(isVerified: boolean): void {
  if (isVerified) {
    this.router.navigate(['tabs']);
  } else {
    this.router.navigate(['verify-email']);
  }
}

}
