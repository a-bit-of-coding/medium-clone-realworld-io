import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IArticle} from 'src/app/shared/types/article.interface'

export const addToFavoritesActions = createActionGroup({
  source: 'Add to favorites',
  events: {
    'Add to favorites': props<{isFavorited: boolean; slug: string}>(),
    'Add to favorites success': props<{article: IArticle}>(),
    'Add to favorites failure': emptyProps(),
  },
})
