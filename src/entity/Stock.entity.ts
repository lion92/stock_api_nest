import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User.entity';
import {Article} from "./Article.entity";


@Entity()
export class Stock {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantite: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  dateAjout:Date


  @ManyToOne(() => User, author => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  @OneToOne(type => Article, article => article.id) article: Article;

}