import {createFeature, createReducer, on} from '@ngrx/store'
import {tagsActions} from './actions'
import {routerNavigationAction} from '@ngrx/router-store'
import {IStagsState} from '../types/tags-state.interface'

// it runs syncron after actions

const initialState: IStagsState = {
  data: [],
  isLoading: false,
  error: null,
}

// selectory are 0000033333
const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    on(tagsActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(tagsActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tags,
    })),
    on(tagsActions.getPopularTagsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      // error: action,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

// selectory are 000004444, get Values from Interface of values in IAuthState
export const {
  name: tagsFeatureKey,
  reducer: tagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = tagsFeature
