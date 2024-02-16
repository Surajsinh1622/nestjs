import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
  USER = 'user',
}

export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ nullable: true, type: 'varchar' })
  type: string;

  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, default: false })
  isMobileVerify: boolean;

  @Column({ nullable: false, default: false })
  isEmailVerify: boolean;

  @Column({ nullable: false, type: 'varchar' })
  device_token: string;

  @Column({ nullable: false, type: 'varchar' })
  device_type: DeviceType;

  @Column({ nullable: true })
  mobileOtp: number;

  @Column({ nullable: true })
  emailOtp: number;

  @Column({ nullable: true, type: 'timestamp' })
  mobileExpirationTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  emailExpirationTime: Date;

  @Column({ nullable: false, default: '' })
  image_url: string;

  @Column({ nullable: false, default: '' })
  thumb_url: string;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
