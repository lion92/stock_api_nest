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
  async remove(@Param('id') id, @Body() jwt: { jwt: string }): Promise<string> {
    const data = await this.jwtService.verifyAsync(jwt.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.stockService.delete(id);
    return 'ok';
  }

  @Put(':id')
  async update(@Param('id') id, @Body() stock: StockDTO): Promise<string> {
    const data = await this.jwtService.verifyAsync(stock.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.stockService.update(id,stock );
    return 'ok';
  }

  @Post()
  async create(@Body() stock: Stock, @Body() jwt: { jwt: string }) {
    const data = await this.jwtService.verifyAsync(jwt.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.stockService.create(stock);
  }

}
