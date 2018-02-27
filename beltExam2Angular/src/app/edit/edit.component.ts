import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  theProduct: any;
  productID: any;
  validationError: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("PRODUCT ID: ", params['id']);
      this.getTheProduct(params['id']);
      this.productID = (params['id'])
    });
    this.validationError = {}
  };

  getTheProduct(ID) {
    let observable = this._httpService.getTheProduct(ID);
    observable.subscribe(data => {
        this.theProduct = data['data'];
        console.log("SHOWCOMPONENT.TS DATA", data)
        console.log("SHOWCOMPONENT.TS DATA", this.theProduct)
    })
  };

  updateProduct(){
    console.log("hello update")
    let observable = this._httpService.editProduct(this.productID, this.theProduct);
    observable.subscribe(data => {
      let product = data as any;
      console.log("UPDATE PRODUCT ", product)

      if (product.message === "Update error") {
        this.validationError = product.error.errors;

        console.log("VALIDATION ERROR ", this.validationError)
      }
      else{
        this._router.navigate(["/products"]);
      }
    })
  };


}
