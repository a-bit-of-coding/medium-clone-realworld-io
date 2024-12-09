import {IArticle} from 'src/app/shared/types/article.interface'
import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'

export interface IEditArticleState {
  article: IArticle | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
}
