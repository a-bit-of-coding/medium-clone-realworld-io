import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import {IUserProfileState} from '../types/user-profile-state.interface'
import {userProfileActions} from './actions'

const initialState: IUserProfileState = {
  isLoading: false,
  error: null,
  data: null,
}

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(userProfileActions.followUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.followUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.followUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(userProfileActions.unfollowUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.unfollowUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.unfollowUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature
