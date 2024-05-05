import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Article {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;


  @Column("decimal", {
    nullable: true,
    precision: 33,
    scale: 18} )
  prix: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  dateAjout:Date


  @ManyToOne(() => User, author => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @ManyToOne(type => User, user => user.id) user: User;


}