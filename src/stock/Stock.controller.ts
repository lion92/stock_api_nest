import {Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException} from '@nestjs/common';

import {StockService} from './Stock.service';
import {JwtService} from '@nestjs/jwt';
import {Stock} from "../entity/Stock.entity";
import {StockDTO} from "../dto/StockDTO";

@Controller('stock')
export class StockController {

  constructor(private readonly stockService: StockService, private jwtService: JwtService) {
  }

  @Get()
  async findAll(): Promise<Stock[] | string> {
    return await this.stockService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Stock | void> {
    return await this.stockService.findOneBy(id).then(value => value).catch(reason => console.log(reason));
  }

  @Delete(':id')
  async remove(@Param('id') id): Promise<string> {

    await this.stockService.delete(id);
    return 'ok';
  }

  @Put(':id')
  async update(@Param('id') id, @Body() stock: StockDTO): Promise<string> {
    await this.stockService.update(id,stock );
    return 'ok';
  }

  @Post()
  async create(@Body() stock: Stock, @Body() jwt: { jwt: string }) {

    await this.stockService.create(stock);
  }

}
