import {UserDTO} from "./UserDTO";
import {User} from "../entity/User.entity";
import {Stock} from "../entity/Stock.entity";

export class PanierDTO {
    readonly id: number;
    readonly prix:number;
    readonly quantite:number;
    readonly dateAjout:Date;
    readonly stock:Stock;
    readonly user:User;
    jwt?: string;
}