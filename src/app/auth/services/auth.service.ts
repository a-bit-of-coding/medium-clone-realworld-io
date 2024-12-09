import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IRegisterRequest} from '../types/register-request.interface'
import {map, Observable} from 'rxjs'
import {ICurrentUser} from 'src/app/shared/types/current-user.interface'
import {IAuthResponse} from '../types/auth-response.interface'
import {environment} from 'src/environments/environment.development'
import {ILoginRequest} from '../types/login-request.interface'
import {ICurrentUserRequest} from 'src/app/shared/types/current-user-request.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  getUser(response: IAuthResponse): ICurrentUser {
    return response.user
  }

  register(data: IRegisterRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users'

    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users/login'

    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/user'
    return this.http.get<IAuthResponse>(url).pipe(map(this.getUser))
  }

  updateCurrentUser(
    currentUserRequest: ICurrentUserRequest
  ): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/user'
    return this.http
      .put<IAuthResponse>(url, currentUserRequest)
      .pipe(map(this.getUser))
  }
}
