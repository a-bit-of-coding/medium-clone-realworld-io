import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {IArticleRequest} from 'src/app/shared/types/article-request.interface'
import {IArticleResponse} from 'src/app/shared/types/article-response.interface'
import {IArticle} from 'src/app/shared/types/article.interface'
import {environment} from 'src/environments/environment.development'

@Injectable()
export class EditArticleService {
  constructor(private readonly http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: IArticleRequest
  ): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<IArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article))
  }
}
