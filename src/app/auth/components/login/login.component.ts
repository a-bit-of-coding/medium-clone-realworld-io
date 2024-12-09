import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectCurrentUser,
} from '../../store/reducer'
import {ILoginRequest} from '../../types/login-request.interface'
import {authActions} from '../../store/actions'
import {BackendErrorMessages} from 'src/app/shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['jajaja@dmdmdmd.de', Validators.required],
    password: ['121212121121212', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  onSubmit(): void {
    const request: ILoginRequest = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request: request}))
  }
}
