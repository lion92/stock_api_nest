import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationOptions} from 'typeorm';
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


  @OneToOne(() => Article)
  @JoinColumn()
  article: Article;



}