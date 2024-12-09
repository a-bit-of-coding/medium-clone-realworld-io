import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IGetFeedResponse} from 'src/app/shared/types/get-feed-response.interface'

// 00000001111

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get feed': props<{url: string}>(),
    'Get feed success': props<{feed: IGetFeedResponse}>(),
    'Get feed failure': emptyProps(),
  },
})
