import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Article} from "../entity/Article.entity";
import {ArticleDTO} from "../dto/ArticleDTO";
import {Stock} from "../entity/Stock.entity";


@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }
  findAllByName(): Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        nom: "ASC"
      },
    })
  }

  findAllByDescription(): Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        description: "ASC"
      },
    })
  }

  findAllByPrice(): Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        prix: "ASC"
      },
    })
  }

  findAllByDate(): Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        dateAjout: "ASC"
      },
    })
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
    const qb =  this.articleRepository
        .createQueryBuilder('article')
        .select("article.id as id, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('user', 'user', "article.userId=user.id")
        .where(`user.id=${id}`)

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserByName(id): Promise<Stock[]> {
    const qb =  this.articleRepository
        .createQueryBuilder('article')
        .select("article.id as id, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('user', 'user', "article.userId=user.id")
        .where(`user.id=${id}`)
        .orderBy("nom", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserByDescription(id): Promise<Stock[]> {
    const qb =  this.articleRepository
        .createQueryBuilder('article')
        .select("article.id as id, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('user', 'user', "article.userId=user.id")
        .where(`user.id=${id}`)
        .orderBy("description", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserByPrice(id): Promise<Stock[]> {
    const qb =  this.articleRepository
        .createQueryBuilder('article')
        .select("article.id as id, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('user', 'user', "article.userId=user.id")
        .where(`user.id=${id}`)
        .orderBy("prix", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserByDate(id): Promise<Stock[]> {
    const qb =  this.articleRepository
        .createQueryBuilder('article')
        .select("article.id as id, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('user', 'user', "article.userId=user.id")
        .where(`user.id=${id}`)
        .orderBy("dateAjout", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserStock(id): Promise<any[]> {
    const qb =  this.stockRepository
        .createQueryBuilder('stock')
        .select("article.id as id, stock.id as stockref, quantite, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .leftJoin('user', 'user', "user.id=article.userId")
        .where(`user.id=${id}`)

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserStockBySumPrixStock(id): Promise<[{prix:number}]> {
    const qb =  this.stockRepository
        .createQueryBuilder('stock')
        .select("sum(article.prix * stock.quantite) as prix")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .leftJoin('user', 'user', "user.id=article.userId")
        .where(`user.id=${id}`)

    console.log(qb.getSql());
    return qb.execute();
  }


  async findByUserStockByName(id): Promise<any[]> {
    const qb =  this.stockRepository
        .createQueryBuilder('stock')
        .select("article.id as id, stock.id as stockref, quantite, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .leftJoin('user', 'user', "user.id=article.userId")
        .where(`user.id=${id}`)
        .orderBy("nom", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserStockByQuantite(id): Promise<Stock[]> {
    const qb =  this.stockRepository
        .createQueryBuilder('stock')
        .select("article.id as id, stock.id as stockref, quantite, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .leftJoin('user', 'user', "user.id=article.userId")
        .where(`user.id=${id}`)
        .orderBy("quantite", "ASC")

    console.log(qb.getSql());
    return qb.execute();
  }



  async update(id: number, articleDTO: ArticleDTO) {
    await this.articleRepository.update(id, {
      dateAjout: articleDTO.dateAjout, description: articleDTO.description, id: articleDTO.id, nom: articleDTO.nom, prix: articleDTO.prix
    });
  }

}
