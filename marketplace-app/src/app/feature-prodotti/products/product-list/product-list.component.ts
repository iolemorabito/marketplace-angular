import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/feature-carrello/cart.service';
import { AuthService } from 'src/app/feature-auth/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  isAdmin: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.route.queryParams.subscribe(params => {this.selectedCategory = params['category'] || '';
        this.filterProducts();
      });

    });
    this.checkAdmin();
  }

  deleteProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (this.isAdmin) {
    if (product) {
      this.productService.deleteProduct(id);
      this.toastr.error(`"${product.name}" è stato eliminato`, 'Prodotto Rimosso');
      this.products = this.products.filter(p => p.id !== id);
    }
  }
  }

  filterProducts(){
    if(this.selectedCategory){
      this.filteredProducts = this.products.filter(product=> product.category === this.selectedCategory);
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  addToCart(product: Product) {
    if (!this.isAdmin) {
    this.cartService.addToCart(product);
    this.toastr.success(`"${product.name}" è stato aggiunto al carrello!`, 'Successo');
  }
}
  
checkAdmin() {
  this.authService.getUserRole().subscribe(role => {
    this.isAdmin = role === 'admin';
  });
}

}
