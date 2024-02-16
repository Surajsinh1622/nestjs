import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
}

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  mobile: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isMobileVerify: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  isEmailVerify: boolean;

  @ApiProperty()
  @IsNotEmpty()
  device_token: string;

  @ApiProperty()
  @IsNotEmpty()
  device_type: DeviceType;

  @ApiProperty({ required: false })
  @IsOptional()
  mobileOtp: number;

  @ApiProperty({ required: false })
  @IsOptional()
  emailOtp: number;

  @ApiProperty({ required: false })
  @IsOptional()
  mobileExpirationTime: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  emailExpirationTime: Date;

  @ApiProperty({ required: false })
  image_url: string;

  @ApiProperty({ required: false })
  thumb_url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isDeleted: boolean;
}

export class UserLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}
