import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FeatureCarrelloComponent } from '../feature-carrello/cart/feature-carrello.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/add', component: ProductFormComponent},
  {path: 'cart', component: FeatureCarrelloComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
