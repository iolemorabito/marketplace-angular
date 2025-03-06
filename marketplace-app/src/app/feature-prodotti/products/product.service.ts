import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productSubject= new BehaviorSubject<Product[]>([]);

  constructor() { 
    this.loadFromLocalStorage();
     }

  getProducts(){
    return this.productSubject.asObservable();
  }

  addProduct(product: Product) {
    product.id = this.products.length +1;
    this.products.push(product);
    this.saveToLocalStorage();
  }

  updateProduct(updateProduct: Product){
    const index = this.products.findIndex(p => p.id === updateProduct.id);
    if (index != -1){
      this.products[index] = updateProduct;
      this.saveToLocalStorage();
        }
  }

  deleteProduct(id: number){
    this.products = this.products.filter(p => p.id !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productSubject.next([...this.products]);
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('products');
    if (data) {
      this.products = JSON.parse(data);
      this.productSubject.next([...this.products]);
    }
}

}
