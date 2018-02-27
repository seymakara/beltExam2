import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/prods')
  };

  addProduct(newProduct){
    console.log("NEWPRODUCT:", newProduct)
    return this._http.post('/prods', newProduct)
  };

  getTheProduct(theProductID){
    return this._http.get(`/prods/${theProductID}`)
  };

  delete(theProductID) {
    return this._http.delete(`/prods/${theProductID}`)
  }

  editProduct(theProductID, product) {
    console.log("EDITPRODUCT SERVICE", product)
    return this._http.put(`/prods/${theProductID}`, product)
  };

}
