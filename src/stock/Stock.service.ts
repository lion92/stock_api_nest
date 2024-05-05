import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Stock} from "../entity/Stock.entity";
import {StockDTO} from "../dto/StockDTO";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  async findOneBy(id: number): Promise<Stock | null> {
    return await this.stockRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.stockRepository.delete(id);
    console.log('1');
  }

  async create(stock: StockDTO) {
    await this.stockRepository.save(stock);
  }

  async update(id: number, stockDTO: StockDTO) {
    await this.stockRepository.update(id, {
      quantite:stockDTO.quantite,
      dateAjout: stockDTO.dateAjout,
      article:stockDTO.article
    }).catch(e=>console.log(e));
  }

}
