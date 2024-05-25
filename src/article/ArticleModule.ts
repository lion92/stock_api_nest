import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ArticleController} from './Article.controller';
import {ArticleService} from './Article.service';
import {PanierService} from '../panier/Panier.service';
import {JwtService} from '@nestjs/jwt';
import {Article} from "../entity/Article.entity";
import {Stock} from "../entity/Stock.entity";
import {Panier} from "../entity/Panier.entity";
import {PdfService} from "./Pdf.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article]),TypeOrmModule.forFeature([Stock]), TypeOrmModule.forFeature([Panier])],
  controllers: [ArticleController],
  providers: [ArticleService,PdfService, JwtService, PanierService],
})
export class ArticleModule {
}
