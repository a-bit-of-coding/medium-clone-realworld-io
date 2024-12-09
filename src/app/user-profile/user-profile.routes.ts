import {Route} from '@angular/router'
import {provideState} from '@ngrx/store'
import {UserProfileComponent} from './components/user-profile/user-profile.component'
import {UserProfileService} from './services/user-profile.service'
import {userProfileFeatureKey, userProfileReducer} from './store/reducers'
import * as userProfileEffects from './store/effects'
import {provideEffects} from '@ngrx/effects'

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffects),
    ],
  },
]
