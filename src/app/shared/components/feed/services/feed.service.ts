import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import {IGetFeedResponse} from '../../../types/get-feed-response.interface'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private readonly http: HttpClient) {}

  getFeed(urlVar: string): Observable<IGetFeedResponse> {
    const url = environment.apiUrl + urlVar
    return this.http.get<IGetFeedResponse>(url)
  }
}
