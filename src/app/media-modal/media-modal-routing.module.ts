import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaModalPage } from './media-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MediaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaModalPageRoutingModule {}
