import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import {IUserProfile} from '../types/user-profile.interface'
import {IGetUserProfileResponse} from '../types/get-user-profile-response.interface'

@Injectable()
export class UserProfileService {
  constructor(private readonly http: HttpClient) {}

  getUserProfile(slug: string): Observable<IUserProfile> {
    const url = `${environment.apiUrl}/profiles/${slug}`
    return this.http
      .get<IGetUserProfileResponse>(url)
      .pipe(map((response) => response.profile))
  }

  followThisUserProfile(username: string): Observable<IUserProfile> {
    const url = `${environment.apiUrl}/profiles/${username}/follow`
    return this.http
      .post<IGetUserProfileResponse>(url, {})
      .pipe(map((response) => response.profile))
  }

  unfollowThisUserProfile(username: string): Observable<IUserProfile> {
    const url = `${environment.apiUrl}/profiles/${username}/follow`
    return this.http
      .delete<IGetUserProfileResponse>(url, {})
      .pipe(map((response) => response.profile))
  }
}
