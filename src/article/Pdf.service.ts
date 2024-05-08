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
    console.log(newVar1);

    doc.text('Bilan');

    newVar1.forEach(value => rowsToPdf.push([value?.id.toString(), value?.stockref.toString(), value?.quantite.toString(), value?.nom.toString(), value?.description.toString(), value?.prix.toString(),value?.dateAjout.toString()]))
    const table={
      headers:["id", "ref","quantite","Nom","Description","Prix","Date Ajout"],
      rows:rowsToPdf
    }




    await doc.moveDown().table(table);
    const fileName = 'bilan.pdf';
    doc.pipe(fs.createWriteStream(fileName));
    doc.end();
    return fs.createReadStream(fileName);
  }

}
