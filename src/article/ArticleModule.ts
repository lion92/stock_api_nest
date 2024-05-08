import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ArticleController} from './Article.controller';
import {ArticleService} from './Article.service';
import {JwtService} from '@nestjs/jwt';
import {Article} from "../entity/Article.entity";
import {Stock} from "../entity/Stock.entity";
import {PdfService} from "./Pdf.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article]),TypeOrmModule.forFeature([Stock])],
  controllers: [ArticleController],
  providers: [ArticleService,PdfService, JwtService],
})
export class ArticleModule {
}
