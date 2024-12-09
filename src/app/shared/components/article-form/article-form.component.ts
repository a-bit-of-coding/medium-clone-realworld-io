import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IArticleFormValues} from './types/article-form-values.interface'
import {IBackendErrors} from '../../types/backend-errors.interface'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {BackendErrorMessages} from '../backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  standalone: true,
  imports: [BackendErrorMessages, ReactiveFormsModule, CommonModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: IArticleFormValues
  @Input() isSubmitting: boolean = false
  @Input() errors: IBackendErrors | null = null

  @Output() articleSubmit = new EventEmitter<IArticleFormValues>()

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: IArticleFormValues = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }
}
