import {CommonModule} from '@angular/common'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {combineLatest, filter, Subscription} from 'rxjs'
import {authActions} from 'src/app/auth/store/actions'
import {selectCurrentUser} from 'src/app/auth/store/reducer'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {BackendErrorMessages} from 'src/app/shared/components/backend-error-messages/backend-error-messages.component'
import {ICurrentUserRequest} from 'src/app/shared/types/current-user-request.interface'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessages],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })
  currentUser?: ICurrentUser
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  currentUserSubscription?: Subscription

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      // password: '',
    })
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    const currentUserRequest: ICurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    }

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  logout(): void {
    this.store.dispatch(authActions.logout())
  }
}
