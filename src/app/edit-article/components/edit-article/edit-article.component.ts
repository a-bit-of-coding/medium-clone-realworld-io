import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {combineLatest, filter, map, Observable} from 'rxjs'
import {ArticleFormComponent} from 'src/app/shared/components/article-form/article-form.component'
import {IArticleFormValues} from 'src/app/shared/components/article-form/types/article-form-values.interface'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {IArticleRequest} from 'src/app/shared/types/article-request.interface'
import {editArticleActions} from '../../store/actions'
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from '../../store/reducers'
import {IArticle} from 'src/app/shared/types/article.interface'

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<IArticleFormValues> = this.store.pipe(
    select(selectArticle),
    filter((article): article is IArticle => article !== null),
    map((article: IArticle) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }
    })
  )
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  })

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }

  onSubmit(articleFormValues: IArticleFormValues): void {
    const request: IArticleRequest = {
      article: articleFormValues,
    }
    this.store.dispatch(
      editArticleActions.updateArticle({request, slug: this.slug})
    )
  }
}
