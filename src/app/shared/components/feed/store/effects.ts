import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {feedActions} from './actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {FeedService} from '../services/feed.service'
import {IGetFeedResponse} from 'src/app/shared/types/get-feed-response.interface'
import {environment} from 'src/environments/environment.development'

// it runs asyncron after actions
export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((response) => ({
            ...response,
            image: response.articles.forEach((i) => {
              i.author.image = i.author.image?.includes('amazonaws')
                ? environment.fakeImageUrl
                : i.author.image
              i.tagList =
                i.tagList.length < 1
                  ? ['maiores', 'veritatis', 'illum', 'non']
                  : i.tagList
            }),
          })),
          map((feed: IGetFeedResponse) => {
            return feedActions.getFeedSuccess({feed})
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
