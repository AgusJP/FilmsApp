import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.page.html',
  styleUrls: ['./media-modal.page.scss'],
})
export class MediaModalPage implements OnInit {

  @Input() name: string;
  @Input() year: string;
  @Input() plot: string;
  @Input() img: string;
  @Input() rating: string;
  @Input() runtime: string;
  @Input() actors: string;
  @Input() director: string;


  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }
}
