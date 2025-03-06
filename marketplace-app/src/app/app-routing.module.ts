import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './feature-prodotti/products/product-form/product-form.component';
import { ProductListComponent } from './feature-prodotti/products/product-list/product-list.component';
import { CoreModule } from './core/core.module';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { FeatureChisiamoComponent } from './feature-chisiamo/feature-chisiamo.component';
import { FeatureContattiComponent } from './feature-contatti/feature-contatti.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  {path: 'chisiamo', component: FeatureChisiamoComponent},
  {path: 'contatti', component: FeatureContattiComponent},
  {path: '', component: MainLayoutComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
