import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service'
import {ArticleService} from '../services/article.service'
import {IArticle} from 'src/app/shared/types/article.interface'
import {articleActions} from './actions'
import {environment} from 'src/environments/environment.development'
import {Router} from '@angular/router'

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          tap((r) => {
            r.tagList =
              r.tagList.length < 1
                ? ['maiores', 'veritatis', 'illum', 'non']
                : r.tagList
            r.author.image = environment.fakeImageUrl
          }),
          map((article: IArticle) => {
            return articleActions.getArticleSuccess({article})
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({slug}) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess()
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
