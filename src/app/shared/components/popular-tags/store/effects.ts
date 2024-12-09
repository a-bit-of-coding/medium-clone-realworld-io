import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tagsActions} from './actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {PopularTagsService} from '../services/popular-tags.service'
import {PopularTagType} from '../types/popular-tag.type'

// it runs asyncron after actions

export const getPopularTagsEffect = createEffect(
  (actions$ = inject(Actions), tagsService = inject(PopularTagsService)) => {
    return actions$.pipe(
      ofType(tagsActions.getPopularTags),
      switchMap(() => {
        return tagsService.getPopularTags().pipe(
          // map((response) => ({
          //   ...response,
          //   image: response.forEach((i) => {
          //     // i.author.image = environment.fakeImageUrl
          //     i.push() = ['maiores', 'veritatis', 'illum', 'non']
          //   }),
          // })),
          map((tags: PopularTagType[]) => {
            return tagsActions.getPopularTagsSuccess({tags})
          }),
          catchError(() => {
            return of(tagsActions.getPopularTagsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
