import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from 'src/shared/utils/jwt.service';
import { User } from 'src/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseBuilderService } from 'src/shared/utils/response-builder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ResponseBuilderService],
})
export class AuthModule {}
