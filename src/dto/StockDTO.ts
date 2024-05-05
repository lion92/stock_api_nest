import {UserDTO} from "./UserDTO";
import {User} from "../entity/User.entity";
import {Article} from "../entity/Article.entity";

export class StockDTO {
    readonly id: number;
    readonly quantite:number;
    readonly article:Article;
    readonly dateAjout:Date;
    jwt?: string;
}