import { Component, effect, input } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Product } from '../models/product.interface'
import { RatingInputOld } from '../rating-input-old/rating-input-old'

@Component({
  selector: 'app-reactive-product-form',
  imports: [ReactiveFormsModule, RatingInputOld],
  templateUrl: './reactive-product-form.html',
})
export class ReactiveProductForm {
  product = input<Product>()

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    rating: new FormControl(0, [Validators.min(1)]),
  })

  constructor() {
    effect(() => {
      const product = this.product()
      if (product) {
        this.formGroup.patchValue({
          name: product.name,
          price: product.price,
          rating: product.rating,
        })
      }
    })

    setTimeout(() => {
      this.formGroup.controls.name.setValue('Hello')
    }, 3000)
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.invalid) return

    console.log('Form value:', this.formGroup.value)
  }
}
