import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConnectionModule} from './connection/connection.module';
import {JwtModule} from '@nestjs/jwt';
import {MulterModule} from '@nestjs/platform-express';
import {ArticleModule} from "./article/ArticleModule";
import {StockModule} from "./stock/StockModule";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'stock_api',
            entities: ['src/../**/*.entity.js'],
            synchronize: true,
        }),
        JwtModule.register({
            secret: process.env.secret,
            signOptions: {expiresIn: '1d'},
        }),
        ArticleModule,
        ConnectionModule,
        StockModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }
}
