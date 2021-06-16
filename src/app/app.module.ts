import { MoviesService } from './api/movies.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire'
import { environmentLogin } from 'src/environments/environment'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "../assets/i18n/", ".json")
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environmentLogin.firebaseConfig),
  AngularFireAuthModule, HttpClientModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   MoviesService, HTTP, SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule {}
