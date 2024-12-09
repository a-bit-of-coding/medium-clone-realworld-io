import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import {IArticleResponse} from '../types/article-response.interface'
import {IArticle} from '../types/article.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private readonly http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http
      .get<IArticleResponse>(fullUrl)
      .pipe(map((response) => response.article))
  }
}
