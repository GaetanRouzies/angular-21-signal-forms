import { Component, signal } from '@angular/core'
import { ReactiveProductForm } from './reactive-product-form/reactive-product-form'
import { SignalProductForm } from './signal-product-form/signal-product-form'
import { Product } from './models/product.interface'

@Component({
  selector: 'app-root',
  imports: [ReactiveProductForm, SignalProductForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-signals-vs-reactives-forms')

  exampleProduct: Product = {
    id: 1,
    name: 'Example Product',
    price: 99.99,
    rating: 4,
  }
}
