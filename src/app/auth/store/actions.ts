import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IRegisterRequest} from '../types/register-request.interface'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {IErrorResponse} from 'src/app/shared/types/error.interface'
import {ILoginRequest} from '../types/login-request.interface'
import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'
import {ICurrentUserRequest} from 'src/app/shared/types/current-user-request.interface'

// 00000001111

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: IRegisterRequest}>(),
    'Register success': props<{currentUser: ICurrentUser}>(),
    'Register failure': props<{errors: IErrorResponse}>(),
    Login: props<{request: ILoginRequest}>(),
    'Login success': props<{currentUser: ICurrentUser}>(),
    'Login failure': props<{errors: IErrorResponse}>(),
    'Get current user': emptyProps(),
    'Get current user success': props<{currentUser: ICurrentUser}>(),
    'Get current user failure': emptyProps(),
    'Update current user': props<{
      currentUserRequest: ICurrentUserRequest
    }>(),
    'Update current user success': props<{currentUser: ICurrentUser}>(),
    'Update current user failure': props<{errors: IBackendErrors}>(),
    Logout: emptyProps(),
  },
})
