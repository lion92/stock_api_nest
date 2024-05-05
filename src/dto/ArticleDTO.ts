import {UserDTO} from "./UserDTO";
import {User} from "../entity/User.entity";

export class ArticleDTO {
    readonly id: number;
    readonly nom: string;
    readonly prenom: string;
    readonly prix:number;
    readonly dateAjout:Date;
    readonly user:User;
    jwt?: string;
}