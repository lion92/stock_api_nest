import {Body, Controller, Delete, Get, Param, Put, Res, UnauthorizedException} from '@nestjs/common';

import {PanierService} from './Panier.service';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "../entity/Article.entity";
import {Repository} from "typeorm";
import {PanierDTO} from "../dto/PanierDTO";
import {Panier} from "../entity/Panier.entity";

@Controller('panier')
export class PanierController {

    constructor(@InjectRepository(Article)
                private panierRepository: Repository<Panier>,
                private readonly panierService: PanierService,
                private jwtService: JwtService) {
    }

    @Get()
    async findAll(): Promise<PanierDTO[] | string> {
        return await this.panierService.findAll();
    }


    @Get('/export/:id')
    async export(@Res() res, @Param('id') id) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const excel = require('node-excel-export');
        const articles = await this.panierService.findByUserStock(id);
        const styles = {
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF000000',
                    },
                },
                font: {
                    color: {
                        rgb: 'FFFFFFFF',
                    },
                    sz: 14,
                    bold: true,
                    underline: true,
                },
            },
            cellPink: {
                fill: {
                    fgColor: {
                        rgb: 'FFFFCCFF',
                    },
                },
            },
            cellGreen: {
                fill: {
                    fgColor: {
                        rgb: 'FF00FF00',
                    },
                },
            },
        };
        // You can define styles as json object

        //Array of objects representing heading rows (very top)
        const heading = [];

        //Here you specify the export structure
        const specification = {
            nom: {
                // <- the key should match the actual data key
                displayName: 'nom', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style

                width: 120, // <- width in pixels
            },
            description: {
                // <- the key should match the actual data key
                displayName: 'description', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style

                width: 120, // <- width in pixels
            },
            prix: {
                // <- the key should match the actual data key
                displayName: 'prix', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style

                width: 120, // <- width in pixels
            },
            quantite: {
                // <- the key should match the actual data key
                displayName: 'quantite', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style

                width: 120, // <- width in pixels
            },
            dateAjout: {
                // <- the key should match the actual data key
                displayName: 'dateAjout', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style

                width: 120, // <- width in pixels
            },
        };

        // The data set should have the following shape (Array of Objects)
        // The order of the keys is irrelevant, it is also irrelevant if the
        // dataset contains more fields as the report is build based on the
        // specification provided above. But you should have all the fields
        // that are listed in the report specification
        const dataset = articles.map((value) => {
            return {
                nom: value.nom,
                description: value.description,
                prix: value.prix,
                quantite: value.quantite,
                dateAjout: value.dateAjout,
            };
        });

        // Define an array of merges. 1-1 = A:1
        // The merges are independent of the data.
        // A merge will overwrite all data _not_ in the top-left cell.

        console.log(dataset);
        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport([
            // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
                name: 'Report', // <- Specify sheet name (optional)
                heading: heading,
                specification: specification, // <- Raw heading array (optional)// <- Merge cell ranges// <- Report specification
                data: dataset, // <-- Report data
            },
        ]);

        // You can then return this straight
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.send(report);
    }


    @Get('/byuserSum/:user')
    async findAllByUserSum(@Param('user') userId): Promise<[{prix:number}]> {
        let numberPromise = await this.panierService.findByUserStockBySumPrixStock(userId);
        console.log(numberPromise)
        return numberPromise;
    }


    @Get('/byuser-stock-name/:user')
    async findAllByUserStockByName(@Param('user') userId): Promise<any[] | string> {
        return await this.panierService.findByUserStockByName(userId);
    }

    @Get('/byuser-stock-quantite/:user')
    async findAllByUserStockByDescription(@Param('user') userId): Promise<any[] | string> {
        return await this.panierService.findByUserStockByQuantite(userId);
    }


    @Get('/byuser/:user')
    async findAllByUser(@Param('user') userId): Promise<any[] | string> {
        return await this.panierService.findByUser(userId);
    }

    @Get('/stockBy/:user')
    async findAllByUserStock(@Param('user') userId): Promise<any[] | string> {
        return await this.panierService.findByUserStock(userId);
    }


    @Get(':id')
    async findOne(@Param('id') id): Promise<PanierDTO | void> {
        return await this.panierService.findOneBy(id).then(value => value).catch(reason => console.log(reason));
    }

    @Delete(':id')
    async remove(@Param('id') id, @Body() jwt: { jwt: string }): Promise<string> {
        const data = await this.jwtService.verifyAsync(jwt.jwt, {secret: 'Je veux pas donner mon mot de passe'});
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.panierService.delete(id);
        return 'ok';
    }

    @Put(':id')
    async update(@Param('id') id, @Body() categorieDTO: PanierDTO): Promise<string> {
        const data = await this.jwtService.verifyAsync(categorieDTO.jwt, {secret: 'Je veux pas donner mon mot de passe'});
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.panierService.update(id, categorieDTO);
        return 'ok';
    }



}
