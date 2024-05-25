import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import {ArticleService} from "./Article.service";
import PDFDocument from "pdfkit-table";
import {PanierService} from "../panier/Panier.service";

@Injectable()
export class PdfService {
  constructor(private article: ArticleService,
              private panierService:PanierService) {
  }

  async generatePdf(id: number): Promise<fs.ReadStream> {
    const doc = new PDFDocument();
    let rowsToPdf=[];
    const newVar1 = await this.article.findByUserStockByName(id);
    let total=await this.article.findByUserStockBySumPrixStock(id)
    console.log(total)
    console.log(newVar1);

    doc.fill("red").text('Bilan');

    newVar1.forEach(value => rowsToPdf.push([value?.id.toString(), value?.stockref.toString(), value?.quantite.toString(), value?.nom.toString(), value?.description.toString(), value?.prix.toString(),value?.dateAjout.toString()]))
    const table={
      headers:["id", "ref","quantite","Nom","Description","Prix","Date Ajout"],
      rows:rowsToPdf
    }

    await doc.fill("blue").moveDown().table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8)
    ,
    }
      );
    doc.fill("green").text("Valeur total du stock: " + total[0].prix);
    const fileName = 'bilan.pdf';
    doc.pipe(fs.createWriteStream(fileName));
    doc.end();
    return fs.createReadStream(fileName);
  }


  async generateInvoicePdf(id: number): Promise<fs.ReadStream> {
    const doc = new PDFDocument();
    let rowsToPdf=[];
    const newVar1 = await  this.panierService.findByUser(id);
    const total = await  this.panierService.findByUserSum(id);


    console.log(total)
    console.log(newVar1);

    doc.fill("red").text('Facture');
    doc.fill("red").text('Ceci est une demo de l\'appplication');

    newVar1.forEach(value => rowsToPdf.push([value?.id.toString(), value?.nomArticle.toString(), value?.descriptionArticle.toString(), value?.quantite.toString(), value?.prix.toString(),value?.dateAjout.toString()]))
    const table={
      headers:["id","nomArticle", "descriptionArticle", "quantite","Prix","Date Ajout"],
      rows:rowsToPdf
    }

    await doc.fill("blue").moveDown().table(table, {
          prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8)
          ,
        }
    );
    doc.fill("green").text("Valeur total de la facture: " + total[0].prix);
    const fileName = 'bilan.pdf';
    doc.pipe(fs.createWriteStream(fileName));
    doc.end();
    return fs.createReadStream(fileName);
  }
}
