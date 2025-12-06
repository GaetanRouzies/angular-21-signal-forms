import { Component, effect, inject, input } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { RatingInputOld } from '../../shared/rating-input-old/rating-input-old'
import { ProductService } from '../product.service'
import { Product } from '../product.interface'

@Component({
  selector: 'app-reactive-product-form',
  imports: [ReactiveFormsModule, RatingInputOld, RouterModule],
  templateUrl: './reactive-product-form.html',
})
export class ReactiveProductForm {
  private productService = inject(ProductService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  productId = input<number>()

  formGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    rating: [0, [Validators.min(1)]],
  })

  constructor() {
    effect(() => {
      const productId = this.productId()
      if (productId) {
        this.productService.getById(productId).subscribe((product: Product) => {
          this.formGroup.patchValue({
            name: product.name,
            price: product.price,
            rating: product.rating,
          })
        })
      }
    })
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.invalid) return

    const formValue = this.formGroup.getRawValue()

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
