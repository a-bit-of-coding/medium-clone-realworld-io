import {createFeature, createReducer, on} from '@ngrx/store'
import {IAuthState} from '../types/auth-state.interface'
import {authActions} from './actions'
import {routerNavigationAction} from '@ngrx/router-store'
// it runs syncron after actions

const initialState: IAuthState = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
}

// selectory are 0000033333
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: undefined,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: undefined,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })),
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    }))
  ),
})

// selectory are 000004444, get Values from Interface of values in IAuthState
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectCurrentUser,
} = authFeature
