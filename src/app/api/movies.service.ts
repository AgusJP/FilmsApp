import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HTTP) { }

  public getAllData(title: string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let request = environment.endpoint + "?" +
        "apikey=" + environment.apikey + "&t=" +
        title;

        try {
          let data = await this.http.get(request,{},{})
          let jdata = JSON.parse(data.data)

          resolve(jdata);
        } catch (err) {
          reject(err);
        }
      });
    }
  
  public searchByTitleAll(title: string,page:number=1):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let request = environment.endpoint + "?" +
        "apikey=" + environment.apikey + "&s=" +
        title+"&page="+page;

      let result = {
        total: 0,
        result: []
      }
      try {
        let data = await this.http.get(request,{},{})
        let jdata = JSON.parse(data.data)
       

        if (data && jdata && jdata.Search) {
          result.total = jdata.totalResults;
          result.result = jdata.Search;
        }
        console.log(jdata)
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  
  public searchByTitleFilms(title: string,page:number=1):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let request = environment.endpoint + "?" +
        "apikey=" + environment.apikey + "&s=" +
        title+"&page="+page+"&type=movie";

      let result = {
        total: 0,
        result: []
      }
      try {
        let data = await this.http.get(request,{},{})
        let jdata = JSON.parse(data.data)
       

        if (data && jdata && jdata.Search) {
          result.total = jdata.totalResults;
          result.result = jdata.Search;
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  public searchByTitleSeries(title: string,page:number=1):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let request = environment.endpoint + "?" +
        "apikey=" + environment.apikey + "&s=" +
        title+"&page="+page+"&type=series";

      let result = {
        total: 0,
        result: []
      }
      try {
        let data = await this.http.get(request,{},{})
        let jdata = JSON.parse(data.data)
       

        if (data && jdata && jdata.Search) {
          result.total = jdata.totalResults;
          result.result = jdata.Search;
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  public searchById(id: string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let request = environment.endpoint + "?" +
        "apikey=" + environment.apikey + "&i=" +
        id;
      let result="";
      try {
        let data = await this.http.get(request,{},{})
        //console.log(data)
        if (data && data.data) {
          result= data.data;
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  }
}