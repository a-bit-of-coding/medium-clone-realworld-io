import {PopularTagType} from '../types/popular-tag.type'

export interface IStagsState {
  data: PopularTagType[] | []
  isLoading: boolean
  error: string | null
}
