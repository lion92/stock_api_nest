import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Article} from "../entity/Article.entity";
import {ArticleDTO} from "../dto/ArticleDTO";
import {Stock} from "../entity/Stock.entity";
import {Panier} from "../entity/Panier.entity";
import {PanierDTO} from "../dto/PanierDTO";


@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {
  }

  findAll(): Promise<Panier[]> {
    return this.panierRepository.find();
  }
  findAllByName(): Promise<Panier[]> {
    return this.panierRepository.find({
      order: {
        prix: "ASC"
      },
    })
  }

  findAllByDescription(): Promise<Panier[]> {
    return this.panierRepository.find({
      order: {
        prix: "ASC"
      },
    })
  }

  findAllByPrice(): Promise<Panier[]> {
    return this.panierRepository.find({
      order: {
        prix: "ASC"
      },
    })
  }

  findAllByDate(): Promise<Panier[]> {
    return this.panierRepository.find({
      order: {
        dateAjout: "ASC"
      },
    })
  }


  async findOneBy(id: number): Promise<Panier | null> {
    return await this.panierRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.panierRepository.delete(id);
    console.log('1');
  }

  async create(panier: PanierDTO) {
    let panier1 = await this.panierRepository.save(panier);
    console.log(panier1)

  }
  async findByUser(id): Promise<any[]> {
    const qb =  this.panierRepository
        .createQueryBuilder('panier')
        .select("panier.id as id, panier.userId as userId, panier.prix as prix, panier.dateAjout as dateAjout, panier.quantite as quantite, article.nom as nomArticle, article.description as descriptionArticle")
        .leftJoin('user', 'user', "panier.userId=user.id")
        .leftJoin('stock', 'stock', "panier.stockId=stock.id")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .where(`panier.userId=${id}`)

    console.log(qb.getSql());
    return qb.execute();
  }

  async findByUserSum(id): Promise<any[]> {
    const qb =  this.panierRepository
        .createQueryBuilder('panier')
        .select("sum(panier.prix * panier.quantite) as prix")
        .leftJoin('user', 'user', "panier.userId=user.id")
        .leftJoin('stock', 'stock', "panier.stockId=stock.id")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .where(`panier.userId=${id}`)

    console.log(qb.getSql());
    return qb.execute();
  }



  async findByUserStock(id): Promise<any[]> {
    const qb =  this.stockRepository
        .createQueryBuilder('panier')
        .select("panier.quantite as quantity, panier.prix as totalPanier, article.id as id, stock.id as stockref, user.id as userId, article.nom as nom, article.description as description, article.prix as prix, article.dateAjout as dateAjout")
        .leftJoin('stock', 'stock', "stock.id=panier.stockId")
        .leftJoin('article', 'article', "article.id=stock.articleId")
        .leftJoin('user', 'user', "user.id=panier.userId")
        .where(`panier.id=${id}`)

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



  async update(id: number, panierDTO: PanierDTO) {
    await this.panierRepository.update(id, {
      dateAjout: panierDTO.dateAjout, id: panierDTO.id, prix: panierDTO.prix, quantite:panierDTO.quantite
    });
  }

}
