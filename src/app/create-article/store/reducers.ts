import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import {createArticleActions} from './actions'
import {ICreateArticleState} from '../types/create-article-state.interface'

const initialState: ICreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
}

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature
