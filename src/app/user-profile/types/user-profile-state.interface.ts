import {IUserProfile} from './user-profile.interface'

export interface IUserProfileState {
  data: IUserProfile | null
  isLoading: boolean
  error: string | null
}
