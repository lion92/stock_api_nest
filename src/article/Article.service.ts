import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Article} from "../entity/Article.entity";
import {ArticleDTO} from "../dto/ArticleDTO";


@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOneBy(id: number): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.articleRepository.delete(id);
    console.log('1');
  }

  async create(categorieDTO: Article) {
    await this.articleRepository.save(categorieDTO);
  }
  async findByUser(id): Promise<any[]> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.select(
        'article.id as id, prix, description, article.nom as nom, user.id as user, dateAjout',
    );
    qb.innerJoin('article.user', 'user');
    qb.where({user: id});
    console.log(qb.getSql());
    return qb.execute();
  }
  async update(id: number, articleDTO: ArticleDTO) {
    await this.articleRepository.update(id, {
      dateAjout: articleDTO.dateAjout, description: articleDTO.description, id: articleDTO.id, nom: articleDTO.nom, prix: articleDTO.prix
    });
  }

}
