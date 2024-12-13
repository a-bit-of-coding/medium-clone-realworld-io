import {HttpClient} from '@angular/common/http'
import {Injectable, OnInit} from '@angular/core'
import {map, Observable} from 'rxjs'
import {IArticleResponse} from 'src/app/shared/types/article-response.interface'
import {IArticle} from 'src/app/shared/types/article.interface'
import {environment} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private readonly http: HttpClient) {}

  addToFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug)
    return this.http.post<IArticleResponse>(url, {}).pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug)

    return this.http.delete<IArticleResponse>(url).pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  getArticle(response: IArticleResponse): IArticle {
    return response.article
  }
}
