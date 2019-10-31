import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private app: BikeService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }
  logout() {
    this.http.post('logout', {}).pipe(finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    })).subscribe();
  }

  ngOnInit() {

  }

}
