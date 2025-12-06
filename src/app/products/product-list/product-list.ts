import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { ProductService } from '../product.service'
import { Subject, startWith, switchMap } from 'rxjs'

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
})
export class ProductList {
  private productService = inject(ProductService)
  private router = inject(Router)

  private refresh$ = new Subject<void>()

  products$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getAll()),
  )

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        this.refresh$.next()
      })
    }
  }
}
