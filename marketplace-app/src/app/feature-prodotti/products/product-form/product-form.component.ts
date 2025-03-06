import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditing = false;
  productId!: number;
  categories: string[] = ['Abbigliamento', 'Elettronica', 'Casa e Giardino', 'Videogiochi'];
  selectedImage: string | ArrayBuffer | null = null;
  charCount: number = 0;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router,  private toastr: ToastrService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿ\s]+$')]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0)]],
      category: ['', Validators.required],
      description: [''],
      image: [null, Validators.required]
    });
    this.updateCharCount();
  }

  updateCharCount() {
    this.charCount = this.productForm.get('description')?.value.length || 0;
  }


  saveProduct(){

    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isEditing){
      this.productService.updateProduct({id:this.productId, ...this.productForm.value });
      this.toastr.success('Prodotto aggiornato con successo!', 'Successo');
    } else {
      this.productService.addProduct(this.productForm.value);
      this.toastr.success('Prodotto aggiunto con successo!', 'Successo');
    }
    this.router.navigate(['/products']);
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.productId = product.id;
    this.productForm.patchValue(product);
  }

  cancel() {
    this.router.navigate(['']);
  }

  resetForm(){
    this.productForm.reset();
    this.isEditing=false;
    this.charCount = 0;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      this.selectedImage = 'assets/images/' + fileName;
      this.productForm.patchValue({ image: fileName });
    }
  }

}
