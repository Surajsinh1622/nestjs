import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { JwtService } from 'src/shared/utils/jwt.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/shared/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(data: CreateUserDto): Promise<{ accessToken: string }> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const newUser = this.userRepository.create(data);

    await this.userRepository.save(newUser);

    const payload = { email: newUser.email, sub: newUser.id };
    const result = { accessToken: this.jwtService.generateToken(payload) };
    return result;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const result = { accessToken: this.jwtService.generateToken(payload) };
    return result;
  }
}
