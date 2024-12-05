import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { PermissionGuard } from '../../guards/permission.guard';
import { RequirePermissions } from '../../decorators/permissions.decorator';

@Controller('user')
@UseGuards(AuthGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @RequirePermissions('user:create')
  async createUser(@Body() body, @Res() res) {
    const result = await this.userService.createUser(body);
    return res.status(result.status).send(result.response);
  }

  @Get(':userId')
  @RequirePermissions('user:read')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Put(':userId')
  @RequirePermissions('user:update')
  async updateUser(@Param('userId') userId: string, @Body() userData) {
    return this.userService.updateUser(userId, userData);
  }

  @Delete(':userId')
  @RequirePermissions('user:delete')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get()
  @RequirePermissions('user:list')
  async listUsers(@Query() filters) {
    return this.userService.listUsers(filters);
  }
}
