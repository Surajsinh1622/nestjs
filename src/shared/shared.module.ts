import { Module } from '@nestjs/common';
import { AwsService } from './utils/aws.service';
import 'dotenv/config';
import { JwtService } from './utils/jwt.service';
import { ResponseBuilderService } from './utils/response-builder.service';
@Module({
  providers: [AwsService, JwtService, ResponseBuilderService],
  exports: [AwsService, JwtService, ResponseBuilderService],
})
export class SharedModule {}
