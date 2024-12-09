export interface IArticleRequest {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
