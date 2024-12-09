import {IGetFeedResponse} from 'src/app/shared/types/get-feed-response.interface'

export interface IFeedState {
  data: IGetFeedResponse | null
  isLoading: boolean
  error: string | null
}
