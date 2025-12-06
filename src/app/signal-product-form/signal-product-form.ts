import { Component, effect, input, signal } from '@angular/core'
import { Field, form, min, minLength, required } from '@angular/forms/signals'
import { FormsModule } from '@angular/forms'
import { Product } from '../models/product.interface'
import { RatingInputNew } from '../rating-input-new/rating-input-new'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-signal-product-form',
  imports: [Field, RatingInputNew, FormsModule, JsonPipe],
  templateUrl: './signal-product-form.html',
})
export class SignalProductForm {
  product = input<Product>()

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
      const product = this.product()
      if (product) {
        this.model.set({
          name: product.name,
          price: product.price,
          rating: product.rating,
        })
      }
    })
  }

  onSubmit() {
    this.form.name().markAsTouched()
    this.form.price().markAsTouched()
    this.form.rating().markAsTouched()
    if (this.form().invalid()) return

    console.log('Form value:', this.form().value())
  }
}
