import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PanierController} from './Panier.controller';
import {PanierService} from './Panier.service';
import {JwtService} from '@nestjs/jwt';
import {Article} from "../entity/Article.entity";
import {Stock} from "../entity/Stock.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Article]),TypeOrmModule.forFeature([Stock])],
  controllers: [PanierController],
  providers: [PanierService, JwtService],
})
export class PanierModule {
}
