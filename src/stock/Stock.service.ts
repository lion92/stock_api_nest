import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Article} from "../entity/Stock.entity";

@Injectable()
export class StockService {
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

  async update(id: number, articleDTO: Article) {
    await this.articleRepository.update(id, {
      article: articleDTO.article
    });
  }

}
