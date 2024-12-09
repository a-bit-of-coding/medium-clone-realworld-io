import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'

export interface ISettingsState {
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
}
