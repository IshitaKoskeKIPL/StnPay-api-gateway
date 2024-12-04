import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() body, @Res() res) {
    const result = await this.userService.createUser(body);
    return res.status(result.status).send(result.response);
  }
}
