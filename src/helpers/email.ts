import * as nodemailer from 'nodemailer';
import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as handlebars from 'handlebars';

dotenv.config();

export class EmailSender {
  public static transporter: nodemailer.Transporter;

  constructor() {
    if (process.env.USE_SMTP === 'true') {
      EmailSender.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } else {
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        region: process.env.AWS_REGION,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      EmailSender.transporter = nodemailer.createTransport({
        SES: new aws.SES({
          apiVersion: '2010-12-01',
          region: process.env.AWS_REGION,
        }),
      });
    }
  }

  public static sendRawMail = async (
    email: any = null,
    subject: any = null,
    text: any = null,
    template: string = null,
    replaceData: any = null,
  ) => {
    // Setting template
    let html = '';
    if (template) {
      html = EmailSender.getHtmlContent(template, replaceData);
    }

    const mailOptions = {
      from: process.env.DEFAULT_FROM,
      html,
      subject,
      to: email,
      text,
    };

    try {
      await EmailSender.transporter.sendMail(mailOptions);
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error in sending email:', error);
    }
  };

  // Just reading html file and then returns in string
  private static getHtmlContent = (template: string, data: any) => {
    const templatesDir = path.resolve(__dirname, '..', 'templates');
    const templatePath = path.join(templatesDir, `${template}.html`);
    const templateFile = fs.readFileSync(templatePath, 'utf8');
    const htmlTemplate = handlebars.compile(templateFile);
    const renderedTodayHtml = htmlTemplate(data);
    return renderedTodayHtml;
  };
}
