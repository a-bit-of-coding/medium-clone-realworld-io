import {Route} from '@angular/router'
import {CreateArticleComponent} from './components/create-article/create-article.component'
import {CreateArticleService} from './services/create-article.service'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import * as createArticleEffects from './store/effects'
import {createArticleFeatureKey, createArticleReducer} from './store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
]
