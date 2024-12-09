import {HttpInterceptorFn} from '@angular/common/http'
import {LocalStorageService} from './localstorage.service'
import {inject} from '@angular/core'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const localStorageService = inject(LocalStorageService)
  const token = localStorageService.get('accessToken')
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  })
  return next(request)
}
