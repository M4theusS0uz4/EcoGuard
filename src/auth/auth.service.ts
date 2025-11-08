import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as brcypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    name: string;
    email: string;
    password: string;
    city: string;
    role: Role;
  }) {
    const hashedPassword = await brcypt.hash(data.password, 10);
    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
    return { message: 'User registered successfully.', user: user };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuário não encontrado.');

    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Senha incorreta.');

    const payload = { sub: user.id, username: user.name,role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
