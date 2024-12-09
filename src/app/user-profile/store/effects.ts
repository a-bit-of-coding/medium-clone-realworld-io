import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {UserProfileService} from '../services/user-profile.service'
import {IUserProfile} from '../types/user-profile.interface'
import {userProfileActions} from './actions'

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({slug}) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: IUserProfile) => {
            return userProfileActions.getUserProfileSuccess({userProfile})
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const followThisUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.followUserProfile),
      switchMap(({username}) => {
        return userProfileService.followThisUserProfile(username).pipe(
          map((userProfile: IUserProfile) => {
            return userProfileActions.followUserProfileSuccess({userProfile})
          }),
          catchError(() => {
            return of(userProfileActions.followUserProfileFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const unfollowThisUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.unfollowUserProfile),
      switchMap(({username}) => {
        return userProfileService.unfollowThisUserProfile(username).pipe(
          map((userProfile: IUserProfile) => {
            return userProfileActions.unfollowUserProfileSuccess({userProfile})
          }),
          catchError(() => {
            return of(userProfileActions.unfollowUserProfileFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
