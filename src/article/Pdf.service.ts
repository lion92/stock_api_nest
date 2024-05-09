import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import {ArticleService} from "./Article.service";
import PDFDocument from "pdfkit-table";

@Injectable()
export class PdfService {
  constructor(private article: ArticleService) {
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
    // Scale the image
    // @ts-ignore
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

}
