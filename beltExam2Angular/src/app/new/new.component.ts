import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;
  validationError: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newProduct = {}
    this.validationError = {}
  }

  addProduct(){
    console.log("creating")
    let observable = this._httpService.addProduct(this.newProduct);
    observable.subscribe(data => {
      console.log("NEWCOMPONENT.TS DATA: ", data)
      let product = data as any;
      console.log("NEW PRODUCT ", product)

      if (product.message === "Error") {
        this.validationError = product.error.errors;

        console.log("VALIDATION ERROR ", this.validationError)
      }
      else{
        this._router.navigate(["/products"]);
      }

    })

  }

}
