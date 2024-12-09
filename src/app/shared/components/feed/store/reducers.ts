import {createFeature, createReducer, on} from '@ngrx/store'
import {feedActions} from './actions'
import {IFeedState} from '../types/feed-state.interface'
import {routerNavigationAction} from '@ngrx/router-store'

// it runs syncron after actions

const initialState: IFeedState = {
  data: null,
  isLoading: false,
  error: null,
}

// selectory are 0000033333
const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedActions.getFeedFailure, (state, action) => ({
      ...state,
      isLoading: false,
      // error: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

// selectory are 000004444, get Values from Interface of values in IAuthState
export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature
