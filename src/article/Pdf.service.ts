import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import {ArticleService} from "./Article.service";


@Injectable()
export class PdfService {
  constructor(private article: ArticleService) {
  }

  async generatePdf(id: number): Promise<fs.ReadStream> {
    const newVar1 = await this.article.findByUserStockByName(id);
    console.log(newVar1);
    const doc = new PDFDocument();
    doc.text('Bilan');
    newVar1.forEach((value) =>
      doc.text(' ' + value.nom + ' ' + value.description+' '+value.quantite+' '+value.prix ),
    );

    const fileName = 'bilan.pdf';
    doc.pipe(fs.createWriteStream(fileName));
    doc.end();

    return fs.createReadStream(fileName);
  }

}
