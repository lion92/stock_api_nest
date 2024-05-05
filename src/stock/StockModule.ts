import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockController } from './Stock.controller';
import { StockService } from './Stock.service';
import { JwtService } from '@nestjs/jwt';
import {Stock} from "../entity/Stock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService, JwtService],
})
export class StockModule {
}
