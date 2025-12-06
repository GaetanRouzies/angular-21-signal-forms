# Angular Forms Comparison

A simple Angular 21 application that compares **Reactive Forms** with **Signal Forms** side by side.

## Purpose

This project demonstrates the differences between two form approaches in Angular 21:

- **Reactive Forms** (traditional approach using `FormGroup` and `FormControl`)
- **Signal Forms** (new approach using Angular Signals and the `form()` function)

Both forms implement the same functionality (create and edit products) so you can easily compare their syntax, patterns, and behavior.

## Features

- ✅ Product list with CRUD operations
- ✅ Create products using both form approaches
- ✅ Edit products using both form approaches
- ✅ Form validation with error messages
- ✅ Custom rating input component

## Key Differences

### Reactive Forms

- Uses `FormGroup` and `FormControl`
- Requires `ReactiveFormsModule`
- Validation with `Validators`
- Access values with `formGroup.value` or `formGroup.getRawValue()`

### Signal Forms

- Uses `form()` function with signals
- Built-in validation with `required()`, `minLength()`, `min()`, etc.
- Access values with `form().value()`
- More type-safe and reactive

## Custom Form Controls

The project also demonstrates how to create custom form controls for both approaches:

- **Reactive Forms**: Uses `ControlValueAccessor` interface
  - Requires implementing `writeValue()`, `registerOnChange()`, `registerOnTouched()`
  - More boilerplate code needed
  - See `rating-input-old` component

- **Signal Forms**: Uses `FormValueControl` interface
  - Simply implement `value = model<T>()`
  - Much simpler and cleaner API
  - See `rating-input-new` component
