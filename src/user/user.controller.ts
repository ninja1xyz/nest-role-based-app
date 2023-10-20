import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody } from '@nestjs/swagger';
import { log } from 'console';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          example: { email: 'string', password: 'string' },
        },
      },
    },
  })
  async login(@Body() body) {
    const user = await this.userService.login(
      body.data.email,
      body.data.password,
    );
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const token = await this.jwtService.signAsync({ role: user.role });

    return token;
  }
}
