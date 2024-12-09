import {IArticle} from './article.interface'

export interface IGetFeedResponse {
  articles: IArticle[]
  articlesCount: number
}
