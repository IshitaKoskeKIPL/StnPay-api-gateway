import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('user/:userId')
  async getUserPermissions(@Param('userId') userId: string) {
    return this.permissionsService.getUserPermissions(userId);
  }

  @Post('assign')
  async assignPermissions(
    @Body() body: { userId: string; permissions: string[] },
  ) {
    return this.permissionsService.assignPermissions(
      body.userId,
      body.permissions,
    );
  }

  @Get('role/:role')
  async getRolePermissions(@Param('role') role: string) {
    return this.permissionsService.getRolePermissions(role);
  }
}
