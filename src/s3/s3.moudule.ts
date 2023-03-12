import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import S3 from 'aws-sdk/clients/s3';
import { S3Service } from './s3.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: S3,
      useFactory: async (configService: ConfigService) => {
        const s3 = new S3({
          region: configService.get<string>('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          },
        });
        return s3;
      },
      inject: [ConfigService],
    },
    S3Service,
  ],
  exports: [S3Service],
})
export class S3Module {}
