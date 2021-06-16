import { User } from './../shared/user.interface';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MoviesService } from './../api/movies.service';
import { AlertController, IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Media } from '../api/Film'
import { AuthService } from '../services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar) searcher: IonSearchbar;

  public all: Array<Media> = [];
  public page: number = 1;
  public Media: Array<Media> = [];
  public userId = ""
  public event: Event;
  user$: Observable<User> = this.authSvc.afAuth.user;
  public docRef;
  public spinner = true;
  data = []
  @ViewChild(IonSearchbar)
  searcher2: IonSearchbar;


  constructor(private moviesService: MoviesService,
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private socialSharing: SocialSharing,
    public alertController: AlertController) {
  }

  ngOnInit() {
    this.getDataOnInit()
  }


  async presentAlertConfirm(eachmedia) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: 'Eliminar Media!',
      message: '¿Está seguro de que desea <strong>eliminarlo</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.userId = this.authSvc.userId
            this.docRef = this.afs.collection("users").doc(this.userId)
            this.Media = []
            this.spinner = true
            this.docRef.get().toPromise().then((doc) => {
              if (doc.exists) {
                let Data: any = doc.data()
                if (Data.media !== undefined && Data.media !== null) {
                  Data.media.forEach(media => {
                    this.Media.push({ ...media })
                  })
                  this.Media.find((media, index, array) => {
                    if (media.imdbID === eachmedia.imdbID) {
                      array.splice(index, 1)
                      this.docRef.set({ media: array }, { merge: true })
                        .then(() => {
                          console.log("Document successfully written!");
                        })
                        .catch((error) => {
                          console.error("Error writing document: ", error);
                        });
                    }
                  })
                }
                this.spinner = false
              } else {
                console.log("No such document!");
              }
            }).catch((error) => {
              console.log("Error getting document:", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  public deleteMedia(eachmedia) {
    this.userId = this.authSvc.userId
    this.docRef = this.afs.collection("users").doc(this.userId)
    this.Media = []
    this.spinner = true
    this.docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        let Data: any = doc.data()
        if (Data.media !== undefined && Data.media !== null) {
          Data.media.forEach(media => {
            this.Media.push({ ...media })
          })
          this.Media.find((media, index, array) => {
            if (media.imdbID === eachmedia.imdbID) {
              array.splice(index, 1)
              this.docRef.set({ media: array }, { merge: true })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            }
          })
        }
        this.spinner = false
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  public search(event) {
    let value = event.target.value;
    if (value && value.trim() != '') {
      this.Media = this.Media.filter(media => {
        return (media.Title.toLowerCase().indexOf(value.toLowerCase()) > -1)
      })
    } else {
      this.Media = []
      this.getDataOnInit()
    }
  }

  public async socialShare(media) {
    try {
      let options = {
        message: media.Title,
        subject: media.Plot,
        files: media.Poster,
        url: media.Poster,
      }
      await this.socialSharing.shareWithOptions(options)
    } catch (err) {
      console.log(err);
    }

  }
  public getData(event) {
    this.userId = this.authSvc.userId
    this.docRef = this.afs.collection("users").doc(this.userId)
    this.Media = []
    this.spinner = true
    this.docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        let Data: any = doc.data()
        if (Data.media !== undefined && Data.media !== null) {
          Data.media.forEach(media => {
            this.Media.push({ ...media })
          })
        }
        event.target.complete()
        this.spinner = false
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  public getDataOnInit() {
    this.userId = this.authSvc.userId
    this.docRef = this.afs.collection("users").doc(this.userId)
    this.docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        let Data: any = doc.data()
        if (Data.media !== undefined && Data.media !== null) {
          Data.media.forEach(media => {
            this.Media.push({ ...media })
          })
        }
        this.spinner = false;

      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

}

/* public async loadAll($event, cargaPrimera) {
   let title = "";
   title = this.searcher.value;
   title = title.trim();
   if (title == "") {
     this.all = [];
     if ($event != null)
       $event.target.complete();
     return
   }

   if (cargaPrimera) {
     this.page = 1;
   } else {
     this.page++;
   }

   //carga las pelis,
   try {
     let data = await this.moviesService.searchByTitleAll(title, this.page);
     if (data && data.result) {
       console.log(data);
       if (this.page == 1) {
         this.all = data.result;
         this.infiniteScroll.disabled = false;
       } else {
         this.all = this.all.concat(data.result);
         if (data.result.length < 10) {
           if ($event != null)
             $event.target.disabled = true;
         }
       }
     } else {
       this.all = [];
     }
     //una vez cargadas->
     if ($event != null)
       $event.target.complete();
   } catch (err) {
     this.all = [];
     if ($event != null)
       $event.target.complete();
   }
 }*/


