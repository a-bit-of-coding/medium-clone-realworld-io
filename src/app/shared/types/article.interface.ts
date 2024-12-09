import {PopularTagType} from '../components/popular-tags/types/popular-tag.type'
import {IAuthor} from './author.interface'

export interface IArticle {
  author: IAuthor
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  title: string
  updatedAt: string
  tagList: PopularTagType[]
}
