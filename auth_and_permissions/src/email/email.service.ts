import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Set up the transporter with Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_NO_REPLY_EMAIL, // Your Gmail address
        pass: process.env.AUTH_NO_REPLY_EMAIL_PASSWORD, // Your Gmail app password or account password
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.AUTH_NO_REPLY_EMAIL, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
      };

      await this.transporter.sendMail(mailOptions);
    } catch {
      throw new HttpException('Error while trying to send email 3ru90u84r', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
