import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getProductsFromService()
  }

  getProductsFromService(){
    let observable = this._httpService.getProducts();
    observable.subscribe(response=> {
      console.log("Got the data from service!", response)
      this.products = response['data'] //response we got from the service is an object. that's why we need to reach data inside this object.
    });
  };

}
