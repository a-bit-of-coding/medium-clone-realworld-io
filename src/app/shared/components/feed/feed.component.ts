import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {Store} from '@ngrx/store'
import {feedActions} from './store/actions'
import {combineLatest} from 'rxjs'
import {selectError, selectFeedData, selectIsLoading} from './store/reducers'
import {CommonModule} from '@angular/common'
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorInboxMessageComponent} from '../error-inbox-message/error-inbox-message.component'
import {environment} from 'src/environments/environment.development'
import {PaginationComponent} from '../pagination/pagination.component'
import queryString from 'query-string'
import {TagListComponent} from '../tag-list/tag-list.component'
import {AddToFavoritesComponent} from '../add-to-favorites/add-to-favorites.component'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorInboxMessageComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = ''
  limit: number = environment.limit
  baseUrl = this.router.url.split('?')[0]
  currentPage: number = 0

  data$ = combineLatest({
    feedData: this.store.select(selectFeedData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  })

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1)
      this.fetchFeed()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue

    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringifiedParam = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParam = `${parsedUrl.url}?${stringifiedParam}`
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParam}))
  }
}
