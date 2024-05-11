import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
import {Stock} from "./Stock.entity";

@Entity()
export class Panier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantite: number;

    @Column("decimal", {
        nullable: true,
        precision: 33,
        scale: 3} )
    prix: number;

    @Column({
        type: 'datetime',
        default: () => 'NOW()',
    })
    dateAjout:Date


    @ManyToOne(type => Stock, stock => stock.id) stock: Stock;
    @ManyToOne(type => User, user => user.id) user: User;

}