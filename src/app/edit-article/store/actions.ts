import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IArticleRequest} from 'src/app/shared/types/article-request.interface'
import {IArticle} from 'src/app/shared/types/article.interface'
import {IBackendErrors} from 'src/app/shared/types/backend-errors.interface'

export const editArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Get article': props<{slug: string}>(),
    'Get article success': props<{article: IArticle}>(),
    'Get article failure': emptyProps(),

    'Update article': props<{request: IArticleRequest; slug: string}>(),
    'Update article success': props<{article: IArticle}>(),
    'Update article failure': props<{errors: IBackendErrors}>(),
  },
})
