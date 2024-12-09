import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {IErrorResponse} from 'src/app/shared/types/error.interface'

export interface IAuthState {
  isSubmitting: boolean
  currentUser: ICurrentUser | null | undefined
  isLoading: boolean
  validationErrors: IErrorResponse | null
}
