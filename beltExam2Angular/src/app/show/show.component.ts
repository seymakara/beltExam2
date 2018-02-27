import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  theProduct: any;
  productID: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("PRODUCT ID: ", params['id']);
      this.getTheProduct(params['id']);
      this.productID = (params['id'])
    });
  };

  getTheProduct(ID) {
    let observable = this._httpService.getTheProduct(ID);
    observable.subscribe(data => {
        this.theProduct = data['data'];
        console.log("SHOWCOMPONENT.TS DATA", data)
        console.log("SHOWCOMPONENT.TS DATA", this.theProduct)
    })
  };

  delete() {
    let observable = this._httpService.delete(this.productID);
    observable.subscribe(data => {
        console.log("SHOWCOMPONENT.TS DELETE DATA", data);
    })
  };

}
