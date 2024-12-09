import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest, filter, map} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducer'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {articleActions} from '../../store/actions'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers'
import {TagListComponent} from 'src/app/shared/components/tag-list/tag-list.component'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {GenericErrorMessageComponent} from 'src/app/shared/components/generic-error-message/generic-error-message.component'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TagListComponent,
    GenericErrorMessageComponent,
    LoadingComponent,
    RouterLink,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is ICurrentUser | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({article, currentUser}) => {
      if (!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}))
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }
}
