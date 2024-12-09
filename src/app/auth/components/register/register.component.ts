import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {IRegisterRequest} from '../../types/register-request.interface'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {
  selectCurrentUser,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducer'
import {authActions} from '../../store/actions'
import {combineLatest} from 'rxjs'
import {BackendErrorMessages} from 'src/app/shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['Name', Validators.required],
    email: ['jajaja@dmdmdmd.de', Validators.required],
    password: ['121212121121212', Validators.required],
  })

  _data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store // private readonly authService: AuthService,
  ) {}

  onSubmit(): void {
    const request: IRegisterRequest = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request: request}))
  }
}
