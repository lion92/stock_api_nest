import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Stock} from "../entity/Stock.entity";
import {StockDTO} from "../dto/StockDTO";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private articleRepository: Repository<Stock>,
  ) {
  }

  findAll(): Promise<Stock[]> {
    return this.articleRepository.find();
  }

  async findOneBy(id: number): Promise<Stock | null> {
    return await this.articleRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.articleRepository.delete(id);
    console.log('1');
  }

  async create(categorieDTO: Stock) {
    await this.articleRepository.save(categorieDTO);
  }

  async update(id: number, articleDTO: StockDTO) {
    await this.articleRepository.update(id, {
      article: articleDTO.article
    });
  }

}
