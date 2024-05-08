import {Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException} from '@nestjs/common';

import {ArticleService} from './Article.service';
import {JwtService} from '@nestjs/jwt';
import {ArticleDTO} from "../dto/ArticleDTO";
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "../entity/Article.entity";
import {Repository} from "typeorm";
import {Stock} from "../entity/Stock.entity";

@Controller('article')
export class ArticleController {

    constructor(@InjectRepository(Article)
                private articleRepository: Repository<Article>,
                private readonly articleService: ArticleService,
                private jwtService: JwtService) {
    }

    @Get()
    async findAll(): Promise<ArticleDTO[] | string> {
        return await this.articleService.findAll();
    }

    @Get('/byuserName/:user')
    async findAllByUserByName(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserByName(userId);
    }

    @Get('/byuserDescription/:user')
    async findAllByUserByDescription(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserByDescription(userId);
    }

    @Get('/byuserDate/:user')
    async findAllByUserByDate(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserByDate(userId);
    }

    @Get('/byuserPrix/:user')
    async findAllByUserByPrice(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserByPrice(userId);
    }

    @Get('/byuser-stock-name/:user')
    async findAllByUserStockByName(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserStockByName(userId);
    }

    @Get('/byuser-stock-quantite/:user')
    async findAllByUserStockByDescription(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserStockByQuantite(userId);
    }


  @Get('/byuser/:user')
  async findAllByUser(@Param('user') userId): Promise<any[] | string> {
    return await this.articleService.findByUser(userId);
  }
    @Get('/stockBy/:user')
    async findAllByUserStock(@Param('user') userId): Promise<any[] | string> {
        return await this.articleService.findByUserStock(userId);
    }



    @Get(':id')
    async findOne(@Param('id') id): Promise<ArticleDTO | void> {
        return await this.articleService.findOneBy(id).then(value => value).catch(reason => console.log(reason));
    }

    @Delete(':id')
    async remove(@Param('id') id, @Body() jwt: { jwt: string }): Promise<string> {
        const data = await this.jwtService.verifyAsync(jwt.jwt, {secret: 'Je veux pas donner mon mot de passe'});
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.articleService.delete(id);
        return 'ok';
    }

    @Put(':id')
    async update(@Param('id') id, @Body() categorieDTO: ArticleDTO): Promise<string> {
        const data = await this.jwtService.verifyAsync(categorieDTO.jwt, {secret: 'Je veux pas donner mon mot de passe'});
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.articleService.update(id, categorieDTO);
        return 'ok';
    }

    @Post()
    async create(@Body() articleDTO: ArticleDTO, @Body() jwt: { jwt: string }) {
        const data = await this.jwtService.verifyAsync(jwt.jwt, {secret: 'Je veux pas donner mon mot de passe'});
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.articleService.create(articleDTO);
    }

}
