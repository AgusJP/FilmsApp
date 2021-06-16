import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaModalPageRoutingModule } from './media-modal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MediaModalPage } from './media-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [MediaModalPage]
})
export class MediaModalPageModule {}
