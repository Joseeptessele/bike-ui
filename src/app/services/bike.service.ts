import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class BikeService {
  
  authenticated = false;

  constructor(private http:HttpClient) { }

  getBikes(){
    return this.http.get('/server/api/v1/bikes');
  }

  getBike(id: number){
    return this.http.get('/server/api/v1/bikes/'+id);
  }

  createBikeRegistration(bike){
    let body = JSON.stringify(bike);  
    return this.http.post('/server/api/v1/bikes/', body, httpOptions);
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}

}
