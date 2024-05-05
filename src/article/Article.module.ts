import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleController } from './Article.controller';
import { ArticleService } from './Article.service';
import { JwtService } from '@nestjs/jwt';
import {Article} from "../entity/Stock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, JwtService],
})
export class articleModule {
}
