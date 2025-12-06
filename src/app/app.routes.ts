import { Routes } from '@angular/router'
import { ProductList } from './products/product-list/product-list'
import { ReactiveProductForm } from './products/reactive-product-form/reactive-product-form'
import { SignalProductForm } from './products/signal-product-form/signal-product-form'

export const routes: Routes = [
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'products/create-reactive',
    component: ReactiveProductForm,
  },
  {
    path: 'products/create-signal',
    component: SignalProductForm,
  },
  {
    path: 'products/:productId/edit-reactive',
    component: ReactiveProductForm,
  },
  {
    path: 'products/:productId/edit-signal',
    component: SignalProductForm,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
]
