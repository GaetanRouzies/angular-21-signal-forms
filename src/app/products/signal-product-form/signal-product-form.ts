import { Component, effect, inject, input, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Field, form, min, minLength, required } from '@angular/forms/signals'
import { Router, RouterModule } from '@angular/router'
import { Product } from '../product.interface'
import { RatingInputNew } from '../../shared/rating-input-new/rating-input-new'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-signal-product-form',
  imports: [Field, RatingInputNew, FormsModule, RouterModule],
  templateUrl: './signal-product-form.html',
})
export class SignalProductForm {
  private productService = inject(ProductService)
  private router = inject(Router)

  productId = input<number>()

  model = signal<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    rating: 0,
  })

  form = form(this.model, (path) => {
    required(path.name, { message: 'Name is required' })
    minLength(path.name, 3, { message: 'Name must be at least 3 characters' })
    min(path.price, 0.01, { message: 'Price must be at least 0.01' })
    min(path.rating, 1, { message: 'Rating must be at least 1' })
  })

  constructor() {
    effect(() => {
      const productId = this.productId()
      if (productId) {
        this.productService.getById(productId).subscribe((product: Product) => {
          this.model.set({
            name: product.name,
            price: product.price,
            rating: product.rating,
          })
        })
      }
    })
  }

  onSubmit() {
    this.form.name().markAsTouched()
    this.form.price().markAsTouched()
    this.form.rating().markAsTouched()
    if (this.form().invalid()) return

    const formValue = this.form().value()

    const productId = this.productId()
    if (productId) {
      // Update
      this.productService.update(productId, formValue).subscribe(() => {
        this.router.navigate(['/products'])
      })
    } else {
      // Create
      this.productService.create(formValue).subscribe(() => {
        this.router.navigate(['/products'])
      })
    }
  }
}
