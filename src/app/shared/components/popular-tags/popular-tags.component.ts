import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {combineLatest} from 'rxjs'
import {tagsActions} from 'src/app/shared/components/popular-tags/store/actions'
import {
  selectPopularTagsData,
  selectError,
  selectIsLoading,
} from './store/reducers'
import {Store} from '@ngrx/store'
import {CommonModule} from '@angular/common'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorInboxMessageComponent} from '../error-inbox-message/error-inbox-message.component'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorInboxMessageComponent,
  ],
})
export class PopularTagsComponent implements OnInit {
  _data$ = combineLatest({
    tagsData: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  })

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(tagsActions.getPopularTags())
  }
}
