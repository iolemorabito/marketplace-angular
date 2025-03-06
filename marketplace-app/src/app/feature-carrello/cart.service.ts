import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/feature-prodotti/products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<{product: Product; quantity: number}[]>([]);

  constructor(){
    this.loadFromLocalStorage();
  }

  getCartObservable(){
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    console.log(`🛒 Tentativo di aggiungere prodotto ID: ${product.id}`);
  
    const existingProduct = this.cart.find(p => p.id === product.id);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.email === 'mkplace@admin.it') {
    return; // Admin non può aggiungere prodotti al carrello
  }
    if (existingProduct) {
      console.log(`🔄 Il prodotto ID: ${product.id} è già nel carrello. Aumento quantità.`);
      this.cart.push(product); // ERRORE! Non aggiungere duplicati, invece aggiorniamo il conteggio
    } else {
      console.log(`✅ Nuovo prodotto ID: ${product.id} aggiunto al carrello.`);
      this.cart.push(product);
    }
    this.updateCart();
  }
  

  getCart(): Product[] {
    return this.cart;
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }




  clearCart(){
    this.cart = [];
    // this.saveToLocalStorage();
    this.updateCart();
  }  

  getGroupedCart(){
    const grouped: { [key: number]: { product: Product, quantity: number } } = {};
  
    this.cart.forEach(product => {
      if (!grouped[product.id]) {
        grouped[product.id]= {product, quantity: 1};
      } else {
        grouped[product.id].quantity++;
      }
    });
  
    return Object.values(grouped);
  }
  
  removeOne(productId: number) {
    console.log(`🔹 Tentativo di rimuovere 1 occorrenza del prodotto ID: ${productId}`);

    const count = this.cart.filter(p => p.id === productId).length;
    console.log(`🛒 Il prodotto è presente ${count} volte nel carrello`);

    if (count > 1) {
        // Se ci sono più copie, rimuove solo una
        const index = this.cart.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.cart.splice(index, 1);
            console.log(`✅ Rimossa 1 occorrenza, rimangono ${count - 1} copie di questo prodotto.`);
        }
        this.updateCart(); // 🔄 Aggiorniamo subito il carrello
    } else {
        // Se era l'ultima copia, eliminiamo completamente il prodotto
        console.log(`❌ Ultima occorrenza rimossa, eliminiamo il prodotto dal carrello.`);
        this.removeProduct(productId);
    }
}

  
  
  
  
removeProduct(productId: number) {
  console.log(`❌ Rimozione completa del prodotto ID: ${productId}`);

  const initialLength = this.cart.length;
  this.cart = this.cart.filter(p => p.id !== productId);
  const finalLength = this.cart.length;

  if (initialLength === finalLength) {
      console.log(`⚠️ Nessun prodotto rimosso! Il prodotto con ID ${productId} non era presente nel carrello.`);
  } else {
      console.log(`✅ Prodotto con ID ${productId} rimosso completamente.`);
  }

  this.updateCart(); // 🔄 Forziamo l'aggiornamento dopo la rimozione
}


  
  
  
  
  

  private saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
  }

  private loadFromLocalStorage(){
    const data = localStorage.getItem('cart');
    if(data){
      this.cart = JSON.parse(data);
      this.updateCart();
    }
  }

  private updateCart() {
    this.cartSubject.next(this.getGroupedCart());
    this.saveToLocalStorage();
    console.log(`🔄 Carrello aggiornato! Prodotti unici: ${this.getGroupedCart().length}, Totale elementi: ${this.cart.length}`);
  }
  
  
  
  
  
}