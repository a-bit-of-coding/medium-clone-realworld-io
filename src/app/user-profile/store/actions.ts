import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IUserProfile} from '../types/user-profile.interface'

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get user profile': props<{slug: string}>(),
    'Get user profile success': props<{userProfile: IUserProfile}>(),
    'Get user profile failure': emptyProps(),
    'Follow user profile': props<{username: string}>(),
    'Follow user profile success': props<{userProfile: IUserProfile}>(),
    'Follow user profile failure': emptyProps(),
    'Unfollow user profile': props<{username: string}>(),
    'Unfollow user profile success': props<{userProfile: IUserProfile}>(),
    'Unfollow user profile failure': emptyProps(),
  },
})
