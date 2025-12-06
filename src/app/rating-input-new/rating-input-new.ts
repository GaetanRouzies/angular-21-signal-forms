import { Component, model } from '@angular/core'
import { FormValueControl } from '@angular/forms/signals'

@Component({
  selector: 'app-rating-input-new',
  imports: [],
  templateUrl: './rating-input-new.html',
  styleUrl: './rating-input-new.scss',
})
export class RatingInputNew implements FormValueControl<number> {
  value = model<number>(0)
  touched = model<boolean>(false)

  setRating(rating: number): void {
    this.value.set(rating)
    this.touched.set(true)
  }
}
