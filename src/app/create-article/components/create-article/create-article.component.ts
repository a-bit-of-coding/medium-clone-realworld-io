import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {ArticleFormComponent} from 'src/app/shared/components/article-form/article-form.component'
import {IArticleFormValues} from 'src/app/shared/components/article-form/types/article-form-values.interface'
import {createArticleActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {IArticleRequest} from 'src/app/shared/types/article-request.interface'

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent implements OnInit {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  onSubmit(articleFormValues: IArticleFormValues): void {
    const request: IArticleRequest = {
      article: articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
