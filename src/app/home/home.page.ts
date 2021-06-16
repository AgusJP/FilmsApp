import { MoviesService } from './../api/movies.service';
import { IonIcon, IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Media } from '../api/Film'
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/user.interface';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { MediaModalPage } from  '../media-modal/media-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar)
  searcher: IonSearchbar;
  public home = "Home"
  public films: Array<Media> = [];
  public series: Array<Media> = [];
  public all: Array<Media> = [];
  public Media: Array<Media> = [];
  public page: number = 1;
  public valueSelected: string = "all";
  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private moviesService: MoviesService,
    private authSvc: AuthService,
    private afs: AngularFirestore,
    public modalController: ModalController
    ) { }

  ngOnInit() { }

  async presentModal(media) {
    let data = await this.moviesService.getAllData(media.Title)
    console.log(data)
    const modal = await this.modalController.create({
      component: MediaModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'name' : media.Title,
        'year' : media.Year,
        'img': media.Poster,
        'plot': data.Plot,
        'rating': data.Ratings[0].Value,
        'runtime': data.Runtime,
        'actors' : data.Actors,
        'director' : data.Director
      }
    });
    return await modal.present();
  }

  public saveData(media, userId) {
    document.querySelector("ion-icon").setAttribute("id", media.imdbID); 
    document.getElementById(media.imdbID).classList.toggle("toggle")
    let docRef = this.afs.collection("users").doc(userId)
    docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        let Data:any = doc.data()
        this.Media = []
        if (Data.media !== undefined && Data.media !== null){
          Data.media.forEach(media => {
            this.Media.push({...media})
          })
        }  
        this.Media.push(media)
        docRef.set({ media: this.Media }, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  public callLoad() {
    if (this.valueSelected === "all") {
      this.loadAll(null, true)
    }
    if (this.valueSelected === "films") {
      this.loadMovies(null, true)
    }
    if (this.valueSelected === "series") {
      this.loadSeries(null, true)
    }
  }

  
  public callLoad2(event) {
    if (this.valueSelected === "all") {
      this.loadAll(event, true)
    }
    if (this.valueSelected === "films") {
      this.loadMovies(event, true)
    }
    if (this.valueSelected === "series") {
      this.loadSeries(event, true)
    }
  }

  public callLoadInfinite($event, cargaPrimera) {
    if (this.valueSelected === "all") {
      this.loadAll($event, cargaPrimera)
    }
    if (this.valueSelected === "films") {
      this.loadMovies($event, cargaPrimera)
    }
    if (this.valueSelected === "series") {
      this.loadSeries($event, cargaPrimera)
    }
  }

  segmentChanged(event: CustomEvent) {
    this.valueSelected = event.detail.value;
    console.log(event.detail.value);
  }

  public async loadAll($event, cargaPrimera) {
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
  }

  public async loadMovies($event, cargaPrimera) {
    let title = "";
    title = this.searcher.value;
    title = title.trim();
    if (title == "") {
      this.films = [];
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
      let data = await this.moviesService.searchByTitleFilms(title, this.page);
      if (data && data.result) {
        console.log(data);
        if (this.page == 1) {
          this.films = data.result;
          this.infiniteScroll.disabled = false;
        } else {
          this.films = this.films.concat(data.result);
          if (data.result.length < 10) {
            if ($event != null)
              $event.target.disabled = true;
          }
        }
      } else {
        this.films = [];
      }
      //una vez cargadas->
      if ($event != null)
        $event.target.complete();
    } catch (err) {
      this.films = [];
      if ($event != null)
        $event.target.complete();
    }
  }

  public async loadSeries($event, cargaPrimera) {
    let title = "";
    title = this.searcher.value;
    title = title.trim();
    if (title == "") {
      this.series = [];
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
      let data = await this.moviesService.searchByTitleSeries(title, this.page);
      if (data && data.result) {
        console.log(data);
        if (this.page == 1) {
          this.series = data.result;
          this.infiniteScroll.disabled = false;
        } else {
          this.series = this.series.concat(data.result);
          if (data.result.length < 10) {
            if ($event != null)
              $event.target.disabled = true;
          }
        }
      } else {
        this.series = [];
      }
      //una vez cargadas->
      if ($event != null)
        $event.target.complete();
    } catch (err) {
      this.series = [];
      if ($event != null)
        $event.target.complete();
    }
  }


}
