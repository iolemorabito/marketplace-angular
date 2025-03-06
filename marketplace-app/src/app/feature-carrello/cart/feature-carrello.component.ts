import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/feature-prodotti/products/models/product.model';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feature-carrello',
  templateUrl: './feature-carrello.component.html',
  styleUrls: ['./feature-carrello.component.css']
})

export class FeatureCarrelloComponent implements OnInit {

  cartItems: {product: Product; quantity: number}[]= [];
  totalPrice: number=0;
  totalQuantity: number = 0;
  selectedProducts: number[] = [];

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    this.updateCart();
    this.cartService.getCartObservable().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  toggleSelection(productId: number) {
    if (this.selectedProducts.includes(productId)) {
      this.selectedProducts = this.selectedProducts.filter(id => id !== productId);
    } else {
      this.selectedProducts.push(productId);
    }
  }

  removeSelectedProducts() {
    if (this.selectedProducts.length === 0) {
      this.toastr.warning('Seleziona almeno un prodotto da rimuovere.', 'Attenzione');
      return;
    }

    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Vuoi davvero rimuovere i prodotti selezionati dal carrello?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sì, rimuovi!',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedProducts.forEach(productId => this.cartService.removeProduct(productId));
        this.selectedProducts = []; // 🔹 Resetta la selezione
        this.updateCart();
        this.toastr.success('Prodotti rimossi con successo!', 'Rimosso');
      }
    });
  }


  purchaseSelectedProducts() {
    if (this.selectedProducts.length === 0) {
      this.toastr.warning('Seleziona almeno un prodotto da acquistare.', 'Attenzione');
      return;
    }

    Swal.fire({
      title: 'Conferma Acquisto',
      text: 'Vuoi procedere con l\'acquisto dei prodotti selezionati?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#38a3a5',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sì, acquista!',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedProducts.forEach(productId => this.cartService.removeProduct(productId));
        this.selectedProducts = []; // 🔹 Resetta la selezione
        this.updateCart();
        this.toastr.success('Acquisto completato!', 'Successo');
      }
    });
  }

  getCartItems(){
    this.cartService.getCartObservable().subscribe(items =>{
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(productId: number) {
    Swal.fire({
        title: 'Sei sicuro?',
        text: 'Vuoi davvero rimuovere questo prodotto dal carrello?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sì, rimuovi!',
        cancelButtonText: 'No, annulla'
    }).then((result) => {
        if (result.isConfirmed) {
            this.cartService.removeProduct(productId);
            this.updateCart();
            this.toastr.success('Prodotto rimosso con successo!', 'Rimosso');
        }
    });
}

  

  clearCart() {
    this.cartService.clearCart();
    this.updateCart();
    this.toastr.info('Carrello svuotato con successo', 'Carrello vuoto');
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
    this.updateCart();
  }
  
  decreaseQuantity(productId: number, quantity: number) {
    console.log(`🔹 Tentativo di diminuire quantità del prodotto ID: ${productId}, quantità attuale: ${quantity}`);

    if (quantity === 1) {
        // Aggiorna visivamente la quantità a 0 prima di rimuovere
        this.cartItems = this.cartItems.map(item => 
            item.product.id === productId ? { ...item, quantity: 0 } : item
        );

        // Mostra conferma per la rimozione
        Swal.fire({
            title: 'Sei sicuro?',
            text: 'Questo prodotto verrà rimosso dal carrello!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sì, rimuovi!',
            cancelButtonText: 'No, annulla'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`❌ Confermata rimozione totale del prodotto ID: ${productId}`);
                this.removeFromCart(productId); // 🔄 Rimuove completamente
                this.toastr.success('Prodotto rimosso con successo!', 'Rimosso');
            } else {
                // Se l'utente annulla, ripristina la quantità originale
                this.cartItems = this.cartItems.map(item => 
                    item.product.id === productId ? { ...item, quantity: 1 } : item
                );
                console.log(`❌ Annullata rimozione del prodotto ID: ${productId}`);
            }
        });
    } else {
        // Se la quantità è maggiore di 1, rimuove normalmente
        console.log(`🔹 Riduzione quantità del prodotto ID: ${productId}`);
        this.cartService.removeOne(productId);
        this.updateCart();
    }
}
  
  updateCart() {
    this.cartItems = this.cartService.getGroupedCart();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  

}

