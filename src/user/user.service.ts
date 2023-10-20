import { Injectable } from '@nestjs/common';
import { Roles } from 'src/locus/locus.enum';

@Injectable()
export class UserService {
  async login(email: string, password: string) {
    const userList = [
      {
        email: 'admin@gmail.com',
        password: 'admin',
        role: Roles.ADMIN,
      },
      {
        email: 'normal@gmail.com',
        password: 'normal',
        role: Roles.NORMAL,
      },
      {
        email: 'limitied@gmail.com',
        password: 'limited',
        role: Roles.LIMITED,
      },
    ];

    for (const user of userList) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }
  }
}
