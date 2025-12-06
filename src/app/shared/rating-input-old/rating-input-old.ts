import { Component, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-rating-input-old',
  imports: [],
  templateUrl: './rating-input-old.html',
  styleUrl: './rating-input-old.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputOld),
      multi: true,
    },
  ],
})
export class RatingInputOld implements ControlValueAccessor {
  rating: number = 0
  maxRating: number = 5

  private onChange = (value: number) => {}
  private onTouched = () => {}

  writeValue(value: number): void {
    this.rating = value || 0
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setRating(rating: number): void {
    this.rating = rating
    this.onChange(this.rating)
    this.onTouched()
  }
}
