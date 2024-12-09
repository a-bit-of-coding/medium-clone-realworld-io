import {ICurrentUser} from './current-user.interface'

export interface ICurrentUserRequest {
  user: ICurrentUser & {password: string}
}
