import {ICurrentUser} from './current-user.interface'

export type TAuthor = Pick<ICurrentUser, 'username' | 'bio' | 'image'>

export interface IAuthor extends TAuthor {
  following: boolean
}
