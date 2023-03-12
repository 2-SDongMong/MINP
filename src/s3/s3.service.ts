import { Injectable } from '@nestjs/common';
import S3 from 'aws-sdk/clients/s3';
import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';
import { S3File } from './s3.interface';

@Injectable()
export class S3Service {
  constructor(private readonly s3: S3) {}

  async uploadFile(file: S3File): Promise<string> {
    const fileName = uuid();
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: bufferStream,
      ContentType: file.mimetype,
    };
    await this.s3.upload(params).promise();

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    await this.s3.deleteObject(params).promise();
  }
}
