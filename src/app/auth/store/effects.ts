import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../services/auth.service'
import {authActions} from './actions'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {LocalStorageService} from 'src/app/shared/services/localstorage.service'
import {Router} from '@angular/router'

// it runs asyncron after actions

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: ICurrentUser) => {
            localStorageService.set('user', currentUser)
            localStorageService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({errors: errorsResponse.error.errors})
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  {functional: true, dispatch: false}
)

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: ICurrentUser) => {
            localStorageService.set('user', currentUser)
            localStorageService.set('accessToken', currentUser.token)
            return authActions.loginSuccess({currentUser})
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({errors: errorsResponse.error.errors})
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  {functional: true, dispatch: false}
)
export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = localStorageService.get('accessToken')
        if (!token) {
          return of(authActions.getCurrentUserFailure())
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            return authActions.getCurrentUserSuccess({currentUser})
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const updateCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({currentUserRequest}) => {
        return authService.updateCurrentUser(currentUserRequest).pipe(
          map((currentUser: ICurrentUser) => {
            return authActions.updateCurrentUserSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.updateCurrentUserFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    localStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorageService.set('accessToken', '')
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
