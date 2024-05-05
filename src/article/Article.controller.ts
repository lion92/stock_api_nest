import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';

import { ArticleService } from './Article.service';
import { JwtService } from '@nestjs/jwt';
import {ArticleDTO} from "../dto/ArticleDTO";

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService, private jwtService: JwtService) {
  }

  @Get()
  async findAll(): Promise<ArticleDTO[] | string> {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<ArticleDTO | void> {
    return await this.articleService.findOneBy(id).then(value => value).catch(reason => console.log(reason));
  }

  @Delete(':id')
  async remove(@Param('id') id, @Body() jwt: { jwt: string }): Promise<string> {
    const data = await this.jwtService.verifyAsync(jwt.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.articleService.delete(id);
    return 'ok';
  }

  @Put(':id')
  async update(@Param('id') id, @Body() categorieDTO: ArticleDTO): Promise<string> {
    const data = await this.jwtService.verifyAsync(categorieDTO.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.articleService.update(id, categorieDTO);
    return 'ok';
  }

  @Post()
  async create(@Body() articleDTO: ArticleDTO, @Body() jwt: { jwt: string }) {
    const data = await this.jwtService.verifyAsync(jwt.jwt, { secret: 'Je veux pas donner mon mot de passe' });
    if (!data) {
      throw new UnauthorizedException();
    }
    await this.articleService.create(articleDTO);
  }

}
