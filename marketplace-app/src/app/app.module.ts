import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './feature-prodotti/products.module';
import { FeatureChisiamoComponent } from './feature-chisiamo/feature-chisiamo.component';
import { FeatureContattiComponent } from './feature-contatti/feature-contatti.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FeatureCarrelloComponent } from './feature-carrello/cart/feature-carrello.component';
import { FeatureAuthModule } from './feature-auth/feature-auth.module';


@NgModule({
  declarations: [
    AppComponent,
    FeatureChisiamoComponent,
    FeatureContattiComponent,
    FeatureCarrelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ProductsModule,
    FeatureAuthModule,
    BrowserAnimationsModule, // Importa il modulo delle animazioni
    ToastrModule.forRoot({ 
      timeOut: 3000, // Durata della notifica in millisecondi
      positionClass: 'toast-bottom-right', // Posizione della notifica
      preventDuplicates: true, // Evita notifiche duplicate
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
