import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {combineLatest, filter, map, Subscription} from 'rxjs'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {userProfileActions} from '../../store/actions'
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../../store/reducers'
import {selectCurrentUser} from 'src/app/auth/store/reducer'
import {IUserProfile} from '../../types/user-profile.interface'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = ''
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is ICurrentUser => Boolean(currentUser))
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is IUserProfile => Boolean(userProfile))
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser.username === userProfile.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  })

  selectedUser?: IUserProfile
  selectedtUserSubscription?: Subscription

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })

    this.selectedtUserSubscription = this.store
      .pipe(select(selectUserProfileData), filter(Boolean))
      .subscribe((selectedUser) => {
        this.selectedUser = selectedUser
        console.log(this.selectedUser)
      })
  }

  ngOnDestroy(): void {
    this.selectedtUserSubscription?.unsubscribe()
  }

  followUser(selectedUser: IUserProfile): void {
    if (selectedUser.following) {
      this.store.dispatch(
        userProfileActions.unfollowUserProfile({
          username: selectedUser.username,
        })
      )
    } else {
      this.store.dispatch(
        userProfileActions.followUserProfile({
          username: selectedUser.username,
        })
      )
    }
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}
