import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import {PopularTagType} from '../types/popular-tag.type'
import {GetPopularTagsResponseInterface} from '../types/get-popular-tags-response.interface'

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private readonly http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'
    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((tag) => tag.tags))
  }
}
