import {Stock} from "../entity/Stock.entity";
import {Article} from "../entity/Article.entity";


export class StockDTO {
    readonly id: number;
    readonly quantite:number;
    readonly article:Article;
    readonly dateAjout:Date;
    jwt?: string;
}