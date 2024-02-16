import { Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export interface UploadParams {
  Bucket: string;
  Key: string;
  Body: any;
  ACL: ObjectCannedACL;
  ContentType: string;
}

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);

  async genThumb(file: any, height: number, width: number) {
    try {
      const thumbnailBuffer = await sharp(file.buffer)
        .resize(width, height)
        .toBuffer();

      const thumbnailKey = `${Date.now()}_thumbnail_${file.originalname}`;
      const thumbnailParams: UploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `thumbnails/${thumbnailKey}`,
        Body: thumbnailBuffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      };

      return await this.uploadToS3(thumbnailParams);
    } catch (error) {
      this.logger.error(
        `Error generating thumbnail: ${error.message}`,
        error.stack,
        'AwsService.genThumb',
      );
      throw error;
    }
  }

  async uploadFile(file: any, folder: string): Promise<string> {
    try {
      const uploadParams: UploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${folder}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read', // Example ACL, change as needed
        ContentType: file.mimetype,
      };

      const location = await this.uploadToS3(uploadParams);
      return location;
    } catch (error) {
      this.logger.error(
        `Error uploading file to AWS S3: ${error.message}`,
        error.stack,
        'AwsService.uploadFile',
      );
      throw error;
    }
  }

  async uploadToS3(uploadParams: UploadParams) {
    try {
      const command = new PutObjectCommand(uploadParams);
      await s3.send(command);
      const location = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
      return location;
    } catch (error) {
      this.logger.error(
        `Error uploading file to AWS S3: ${error.message}`,
        error.stack,
        'AwsService.uploadToS3',
      );
      throw error;
    }
  }
}
