import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  models: string[] = [
    'Globo MTB 29 Full Suspension',
    'Globo Carbon Fiber Race Series',
    'Globo Time Trial Blade',
  ];

  bikeform: FormGroup;
  validMessage: string = "";

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.bikeform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      //contact: new FormControl('', Validators.required),
    });
  }

  submitRegistration(){
    if (this.bikeform.valid){
      this.validMessage = "Your bike registration has been submitted. Thank you!";
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
      console.log(this.bikeform.value);
    }
  }

}
