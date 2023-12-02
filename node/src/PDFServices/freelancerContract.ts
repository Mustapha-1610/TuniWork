import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import admin from "../Firebase/firebaseAdmin";
import { isEmpty } from "lodash";


async function createPDF(PDFData: any) {
  return new Promise(async (resolve, reject) => {

    const doc = new PDFDocument();
    const fileName = `Contract_${Date.now()}.pdf`;
    const passThrough = new PassThrough();
    const bucket = admin.storage().bucket();

    const file = bucket.file(fileName);
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: "application/pdf",
      },
    });

    doc.
    pipe(passThrough);
    passThrough
      .pipe(writeStream)
      .on("error", (error: any) => reject(error))
      .on("finish", () => {
        file
          .makePublic()
          .then(async () => {
            resolve(file.publicUrl());
            console.log(file.publicUrl());
          })
          .catch((error: any) => {
            reject(error);
          });
      });

    const topMargin = 50;
    const leftMargin = 50;


    
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Work Offer Contract", leftMargin, topMargin, {
        align: "left",
      });

    doc
      .moveTo(50, topMargin + 20)
      .lineTo(doc.page.width - 50, topMargin + 20)
      .stroke();

    doc.moveDown(2);


    doc
      .fontSize(12)
      .font("Helvetica")
      .text("This is the beginning of the contract...", {
        align: "left",
        indent: 20,
        height: 300,
      });


    doc
      .fontSize(12)
      .font("Helvetica")
      .text("Greetings ,  " + PDFData.FreelancerInfos.FreelancerName, {
        align: "left",
        indent: 20,
        height: 300,
      });

      
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("Company Name = " + PDFData.CompanyInfos.CompanyName, {
        align: "left",
        indent: 20,
        height: 300,
      });



    if (PDFData.WorkInfos.PaymentMethod.FixedPrice) {
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Fixed Price = " + PDFData.WorkInfos.PaymentMethod.FixedPrice, {
          align: "left",
          indent: 20,
          height: 300,
        });
    } else if (PDFData.WorkInfos.PaymentMethod.PayPerHour) {
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Pay Per Hour = " + PDFData.WorkInfos.PaymentMethod.PayPerHour, {
          align: "left",
          indent: 20,
          height: 300,
        });


      doc
        .fontSize(12)
        .font("Helvetica")
        .text(
          "Hours Per Week = " + PDFData.WorkInfos.PaymentMethod.HoursPerWeek,
          {
            align: "left",
            indent: 20,
            height: 300,
          }
        );

      doc
        .fontSize(12)
        .font("Helvetica")
        .text(
          "Estimated Duration  = " + PDFData.WorkInfos.PaymentMethod.Duration,
          {
            align: "left",
            indent: 20,
            height: 300,
          }
        );
    }
    doc.end();
    return file.publicUrl();
  });
}

export default createPDF;
