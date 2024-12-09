import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'

export interface ICreateArticleState {
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
}
