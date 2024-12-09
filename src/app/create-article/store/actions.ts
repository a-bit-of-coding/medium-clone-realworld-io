import {createActionGroup, props} from '@ngrx/store'
import {IArticleRequest} from 'src/app/shared/types/article-request.interface'
import {IArticle} from 'src/app/shared/types/article.interface'
import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{request: IArticleRequest}>(),
    'Create article success': props<{article: IArticle}>(),
    'Create article failure': props<{errors: IBackendErrors}>(),
  },
})
