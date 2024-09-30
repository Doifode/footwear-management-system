import { IBrand } from "./Brand";

export interface IArticle extends IBrand {
    articleName: string,
    articleId: number,
}